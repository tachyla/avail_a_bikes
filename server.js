'use strict';

const express = require('express');
// calling `express()` creates a new app, which we set to 
// the constant `app`
const app = express();
const path = require(`path`);

// this sets up a static file server that can serve
// assets from a public folder
app.use(express.static('public'));

app.get('/avail-a-bikes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
