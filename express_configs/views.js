const path = require('path');

module.exports = (mainApp, subApps) => {
  const expressNunjucks = require('express-nunjucks');
 
  mainApp.set('views', path.resolve('views'));

  const isDev = process.env.APP_ENV === 'development';

  const njk = expressNunjucks([ mainApp, ...subApps ], {
    watch: isDev,
    noCache: isDev
  });

  const reqCtxProcessor = (req, ctx) => {
    ctx.csrfToken = req.csrfToken();
    ctx.req = req;
  };

  mainApp.use(njk.ctxProc([
    reqCtxProcessor 
  ]));
};