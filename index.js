const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./DB/mongoose')();

require('./models/User');
require('./models/Survey');
require('./services/passport');

const app = express();

// Post or put with request body this middleware will intrupte and add json to req.body
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in millisecond
    keys: [keys.cookieKey], //random string for end user not manipulating cookie
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoute = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

authRoute(app);
billingRoutes(app);
surveyRoutes(app);

// React route
//Only for Production send main.js main.css and index.html file
//DEV we handle in setupProxy.js in client project
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendDate(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// app.get('/', (req, res) => {
//   res.cookie('name', 'srikalyan').send('welcome hello');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('listening to port 5000'));
