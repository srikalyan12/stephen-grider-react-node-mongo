const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'], // scope is information need about the user from google
    })
  );

  app.get(
    '/auth/google/callback',
    // Google response with code /auth/google/callback?code=123434'
    // Fetching code we request with code for user profile using passport.js
    passport.authenticate('google')
  );

  app.get('/api/logout', (req, res) => {
    // Passport add logout object to request object
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    // Passport set usermodel to request object
    res.send(req.user);
  });
};
