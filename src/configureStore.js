import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import contact from './reducers/contact';
import user from './reducers/user';
import index from './reducers/index';

module.exports = function (initialState = {}) {
    const combined = combineReducers({
        contact,
        user,
    });

    return createStore(combined, initialState, applyMiddleware(thunk));
}