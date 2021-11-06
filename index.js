const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./DB/mongoose')();

require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in millisecond
    keys: [keys.cookieKey], //random string for end user not manipulating cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoute = require('./routes/authRoutes');

authRoute(app);

// app.get('/', (req, res) => {
//   res.cookie('name', 'srikalyan').send('welcome hello');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('listening to port 5000'));
