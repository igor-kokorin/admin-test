const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.resolve('views', 'auth'));

const { User } = require('../../data_access');

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const formData = {
    login: (req.body.login || '').trim(),
    password: req.body.password
  };

  const user = await User.findOne({
    where: {
      name: formData.login
    }
  });

  if (!user || !(await user.checkPassword(formData.password))) {
    res.redirect('/auth/login');
    return;
  }

  res.cookie('userId', user.id);

  res.redirect('/');
});

app.post('/logout', (req, res) => {
  res.cookie('userId', '', { maxAge: 0 });

  res.redirect('/');
});

module.exports = app;