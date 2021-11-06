const passport = require('passport');

const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const User = mongoose.model('users');

// Will be called after GoogleStratrgy callback is executed
passport.serializeUser((user, done) => {
  console.log('serialize user');
  done(null, user.id);
});

// will be called when user make request for data in session
// user ID is fetched from req.session.passport and ID is validated
passport.deserializeUser((id, done) => {
  console.log('deserializeUser user');
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    // Once passport.js send code which we get from google '/auth/google/callback?code=12345'
    // In case of successful request
    // This call back is triggerd with user profile
    (accessToken, refreshToken, profile, cb) => {
      console.log('User profile callback');
      //console.log('ACCESS Token', accessToken, profile, cb.toString());
      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          // callback null if any error, user instance
          cb(null, user);
        } else {
          new User({ googleId: profile.id }).save().then((user) => {
            cb(null, user);
          });
        }
      });
    }
  )
);
