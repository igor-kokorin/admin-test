require('dotenv').config();

const configureViews = require('./express_configs/views');
const configureStaticFiles = require('./express_configs/static_files');
const configureCookies = require('./express_configs/cookies');
const configureForms = require('./express_configs/forms');

const express = require('express');
const authLogin = require('./controllers/auth/login');
const adminUsers = require('./controllers/admin/users');

const app = express();

configureStaticFiles(app);
configureCookies(app);
configureForms(app);
configureViews(app, [ authLogin, adminUsers ]);

app.use('/auth', authLogin);
app.use('/admin/users', require('./express_middleware/auth'), adminUsers);

app.get('/', (req, res) => {
  res.redirect('/admin/users');
});

const { PORT, HOST } = process.env;

app.listen(PORT, HOST, null, () => {
  console.log(`listening on port ${HOST}:${PORT}`);
});