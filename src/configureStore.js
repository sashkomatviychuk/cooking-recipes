import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import contact from './reducers/contact';
import user from './reducers/user';
import index from './reducers/index';
import recipes from './reducers/recipes';

module.exports = function (initialState = {}) {
    const combined = combineReducers({
        contact,
        user,
        recipes,
    });

    return createStore(combined, initialState, applyMiddleware(thunk));
}