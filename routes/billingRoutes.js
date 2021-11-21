const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');
module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'inr',
      source: req.body.id,
      description: '5 rs for emaily credit',
    });

    // req contain user model, so we can add credit and save to DB
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
