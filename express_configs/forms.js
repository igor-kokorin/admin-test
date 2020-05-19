const bodyParser = require('body-parser');
const csurf = require('csurf');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  
  app.use(csurf({
    cookie: true
  }));
};