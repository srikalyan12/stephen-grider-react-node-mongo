const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requiredCredits = require('../middleware/requireCredits');
const Survey = mongoose.model('surveys');
// const Recipient = require('../models/Recipient');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

module.exports = (app) => {
  app.get('/api/surveys', (req, res) => {
    res.send('Thanks for the response');
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
};
