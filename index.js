const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log(typeof req.headers.cookie);
  res.cookie('name', 'srikalyan').send('welcome hello');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('listening to port 5000'));
