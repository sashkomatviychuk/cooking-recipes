import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import contact from './reducers/contact';
import user from './reducers/user';
import recipes from './reducers/recipes';
import info from './reducers/info';

module.exports = function (initialState = {}) {
    const combined = combineReducers({
        contact,
        user,
        recipes,
        info,
    });

    return createStore(combined, initialState, applyMiddleware(thunk));
}