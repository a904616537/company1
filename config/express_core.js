var express        = require('express'),
    path           = require('path'),
    bodyParser     = require("body-parser"),
    glob           = require('glob'),
    async          = require('async'),
    config         = require('./config'),
    i18n           = require(config.root + '/app/language/i18n'),
    routes         = glob.sync(config.root + '/app/routes/**/*.js'),
    compress       = require('compression'),
    methodOverride = require('method-override'),
    zlib           = require('zlib'),
    session        = require('express-session');
    mongoStore     = require('connect-mongo')(session),
    cookieParser   = require('cookie-parser');


module.exports = (app, config) => {
  app.set ('views',config.root + '/app/views');
  app.set ('view engine','jade');
  app.engine('jade', require('jade').__express);

  app.use(cookieParser());
	app.use(i18n);

  app.use(express.static(path.join(config.root, '/public')));
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(compress({
      level   : zlib.Z_BEST_COMPRESSION,
      memLevel: 1
  }));

  app.use(session({
    name             : config.cookie.sessionName,
    secret           : config.cookie.secret,
    store            : new mongoStore({url: config.mongo, autoRemove: 'native', ttl: 0.5 * 60 * 60 }),
    saveUninitialized: true,
    resave           : false,
    cookie           : { httpOnly: true, maxAge: 1000 * 3600 * 24 }
  }));

  async.each(routes,  route => {
    require(route)(app);
  });
}
