const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const passport = require('passport');
const session = require('express-session');

const config = require('./config');
// webpack middleware
const applyWebpackMiddleware = require('./app/services/front/webpack');
// require controllers
const recipesRoutes = require('./app/controllers/recipesController');
const authRoutes = require('./app/controllers/authController');
const frontRoutes = require('./app/controllers/frontController');
const pagesRoutes = require('./app/controllers/pagesController');
// models
require('./app/models');
// passport 
require('./app/services/auth/passport');

/**
 * Application definition
 */
class Application {
 
    constructor() {
        this.express = express();

        // configure application
        this.middlewares();
        this.setupViews();
        this.setupDb();
        this.ssrRendering();
    }

    middlewares() {
        // applying webpack hmr middleware if dev mode enabled 
        applyWebpackMiddleware(this.express);
        //this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
        this.express.use(express.static(config.publicPath));
        this.express.use(session(config.session));
        // init passport
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        // apply routes
        this.express.use('/api', recipesRoutes);
        this.express.use('/api', authRoutes);
        this.express.use('/api', pagesRoutes);
    }

    setupViews() {
        this.express.set('views', config.viewsPath);
        this.express.set('view engine', 'jade');
        this.express.locals.moment = moment;
    }

    setupDb() {
        mongoose.connect(config.connection);
    }

    ssrRendering() {
        this.express.get('*', frontRoutes);
    }
}

module.exports = new Application().express;
