const express = require('express');
const router = express.Router();

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const reducers = require('./../../src/reducers');
const { StaticRouter } = require('react-router');
const configureStore = require('./../../src/configureStore');
const App = require('./../../src/containers/App').default;

router.get('*', async (req, res) => {
    const initialState = {
        user: {
            isLoggedIn: false,
        }
    };

    const context = {};

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

    return res.render('index', { state, appMarkup });
});

module.exports = router;
