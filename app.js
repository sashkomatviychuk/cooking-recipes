const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const webpack = require('webpack');
const passport = require('passport');
const session = require('express-session');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const reducers = require('./src/reducers');
const { StaticRouter } = require('react-router');
const configureStore = require('./src/configureStore');
const App = require('./src/containers/App').default;

const config = require('./config');
const webpackConfig = require('./webpack.config');
// require controllers
const recipesRoutes = require('./app/controllers/recipesController');
const authRoutes = require('./app/controllers/authController');
// models
require('./app/models');
// passport 
require('./app/services/auth/passport');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

class Application {
    constructor() {
        this.express = express();

        this.middlewares();
        // this.setupViews();
        this.setupDb();
        this.ssrRendering();
    }

    middlewares() {
        if (isDev) {
            const compiler = webpack(webpackConfig);

            this.express.use(require('webpack-dev-middleware')(compiler, {
                serverSideRender: true,
                publicPath: webpackConfig.output.publicPath,
            }));
              
            this.express.use(require('webpack-hot-middleware')(compiler));
        }
        //this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
        this.express.use(express.static(config.publicPath));
        this.express.use(session({
            secret: '123',
            saveUninitialized: true,
            resave: true,
        }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        this.express.use('/api', recipesRoutes);
        this.express.use('/api', authRoutes);
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
        const initialState = {
            user: {
                isLoggedIn: false,
            }
        };

        const context = {};

        this.express.get('*', async (req, res) => {
            if (req.user) {
                initialState.user = {
                    data: req.user,
                    isLoggedIn: true,
                }
            }
            const store = configureStore(initialState);
            
            const appMarkup = ReactDOMServer.renderToString(
                <StaticRouter location={req.url} context={context}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </StaticRouter>
            );

            if (context.url) {
                return res.redirect(301, context.url);
            }

            const state = store.getState();

            res.end(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Cooking Recipes</title>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
                        <script>
                            window.REDUX_INITIAL_STATE = ${JSON.stringify(store)};
                        </script>
                    </head>
                    <body>
                        <div id="root">${appMarkup}</div>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                        <!-- Latest compiled and minified JavaScript -->
                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
                        <script type="text/javascript" src="/dist/bundle.js">
                        </script>
                    </body>
                </html>
            `);
        });
    }
}

module.exports = new Application().express;
