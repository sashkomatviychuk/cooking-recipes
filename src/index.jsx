import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import 'styles/index.sass'
import App from 'containers/App'
import configureStore from 'configureStore.browser'

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

const render = Component => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <Component />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

render(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NewApp = require('containers/App').default;
        render(NewApp);
	});
}