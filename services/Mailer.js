const sendGrid = require('sendgrid');

const helper = sendGrid.mail;

const { sendGridKey } = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, template) {
    super();

    this.sgApi = sendGrid(sendGridKey);
    this.from_email = new helper.Email('srikalyan.rs@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', template);
    this.recipients = recipients.map(({ email }) => new helper.Email(email));

    // Need to register our body to addcontent
    // addContent method is present in helper.Mail class we extended
    // Alternative we can use mail chanper instead to sendgrid
    this.addContent(this.body);

    this.addClickTracking();
    this.addRecipients();
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  addClickTracking() {
    const trackingSetting = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSetting.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSetting);

    // this.addTrackingSettings(
    //   new helper.TrackingSettings(new helper.clickTracking(true, true))
    // );
  }

  // Send Mailer config to send grid
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
