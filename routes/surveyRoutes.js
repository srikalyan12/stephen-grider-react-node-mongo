const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requiredCredits = require('../middleware/requireCredits');
const Survey = mongoose.model('surveys');
// const Recipient = require('../models/Recipient');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

module.exports = (app) => {
  app.get('/api/surveys/:surveyId/:result', (req, res) => {
    res.send('Thanks for the response');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, ({ email, url }) => {
      const pathname = new URL(url).pathname;
      const p = new Path('/api/surveys/:surveyId/:choice');
      const match = p.test(pathname);
      if (match) {
        return { email, ...match };
      }
    });
    console.log('*****Events*****', events);

    //Remove null, undefined and false using compact
    // Remove duplicate using uniq
    const compactEvent = _.uniq(_.compact(events), 'email', 'surveyId');
    _.forEach(compactEvent, (event) => {
      Survey.updateOne(
        {
          _id: event.surveyId,
          recipients: {
            $elemMatch: { email: event.email, responded: false },
          },
        },
        {
          $inc: { [event.choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }
      ).exec();
    });

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requiredCredits, async (req, res) => {
    // login for survey creation
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      // recipients: recipients
      //   .split(',')
      //   .map((email) => new Recipient({ email })),
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // create mailer configuration
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      // Once success save survey and debit once credit from user
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(user);
    }
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: 0,
    });
    res.send(surveys);
  });
};
