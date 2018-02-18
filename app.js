const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const reducers = require('./src/reducers');
const { StaticRouter } = require('react-router');
const configureStore = require('./src/configureStore');
const App = require('./src/containers/App').default;

const config = require('./config');
// require controllers

class Application {
    constructor() {
        this.express = express();

        this.middlewares();
        // this.setupViews();
        // this.setupDb();
        this.ssrRendering();
    }

    middlewares() {
        //this.express.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cookieParser());
        this.express.use(express.static(config.publicPath));
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
        const initialState = {};
        const context = {};

        this.express.get('*', async (req, res) => {
            const store = configureStore(initialState);
            
            // try {
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
            // } catch (err) {
            //     res.send({ err: err.toString()});
            // }
        });
    }
}

module.exports = new Application().express;
