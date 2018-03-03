import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

import contact from './reducers/contact';
import user from './reducers/user';
import recipes from './reducers/recipes';
import info from './reducers/info';

export default function () {
    const engine = createEngine('cooking-recipes');
    const storeMiddleware = storage.createMiddleware(engine);
    const createStoreWithMiddleWare = applyMiddleware(thunk, storeMiddleware)(createStore);
    const combined = combineReducers({
        contact,
        user,
        recipes,
        info,
    })

    const store = createStoreWithMiddleWare(
        storage.reducer(combined),
        window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    const load = storage.createLoader(engine);
    load(store)

    return store;
}