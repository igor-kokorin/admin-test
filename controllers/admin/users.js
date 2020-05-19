const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.resolve('views', 'admin', 'users'));

const { User } = require('../../data_access');
const RoleEnum = require('../../data_access/enums/role');

app.get('/', async (req, res) => {
  const users = await User.findAll({
    order: [
      [ 'name', 'ASC' ]
    ]
  });

  res.render('list', { users });
});

app.get('/create', (req, res) => {
  res.render('create', { availableRoles: RoleEnum });
});

app.post('/create', async (req, res) => {
  const formData = {
    name: req.body.name,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
    locked: req.body.locked === 'on',
    role: req.body.role
  };

  const user = User.build({
    name: formData.name,
    locked: formData.locked,
    role: req.body.role
  });

  await user.setPassword(formData.password);

  try {
    await user.save();
  } catch (e) {
    if (e.name !== 'SequelizeUniqueConstraintError') {
      throw e;
    }

    res.render('create', { ...formData, availableRoles: RoleEnum, errorMessage: 'Пользователь с таким именем уже существует' });
    return;
  }

  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    }
  });

  if (!user) {
    res.redirect('/');

    return;
  }

  const formData = {
    name: user.name,
    locked: user.locked,
    role: user.role
  };

  res.render('edit', { availableRoles: RoleEnum, ...formData });
});

app.post('/edit/:id', async (req, res) => {
  const formData = {
    name: req.body.name,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
    locked: req.body.locked === 'on',
    role: req.body.role
  };

  const user = await User.findOne({
    where: {
      id: req.params.id
    }
  });

  if (!user) {
    res.redirect('/');

    return;
  }

  try {
    await user.updateValues({
      name: formData.name,
      locked: formData.locked,
      role: req.body.role,
      password: req.body.password
    });
  } catch (e) {
    if (e.name !== 'SequelizeUniqueConstraintError') {
      throw e;
    }

    res.render('edit', { ...formData, availableRoles: RoleEnum, errorMessage: 'Пользователь с таким именем уже существует' });
    return;
  }

  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    }
  });

  if (!user) {
    res.redirect('/');

    return;
  }

  res.render('delete', { id: user.id, name: user.name });
});

app.post('/delete/:id', async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    }
  });

  if (!user) {
    res.redirect('/');

    return;
  }

  await user.destroy();

  res.redirect('/');
});

module.exports = app;