const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const { nome, dtnascimento } = req.body;
  const idade = moment().diff(moment(dtnascimento, 'DD/MM/YYYY'), 'years');
  if (idade >= 18) {
    res.redirect(`/major?nome=${nome}`);
  } else {
    res.redirect(`/minor?nome=${nome}`);
  }
});

app.get('/major', (req, res) => {
  const { nome } = req.query;
  res.render('major', { nome });
});

app.get('/minor', (req, res) => {
  const { nome } = req.query;
  res.render('minor', { nome });
});

app.listen(3000);
