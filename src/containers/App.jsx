import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import requireAuth from './hoc/RequireAuth';
import requireNotAuth from './hoc/RequireNotAuth';

import Header from './Header';
import Home from './Home';
import Recipes from './recipes/Recipes'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'

const App = (props) => (
    <div className="container">
        <Header />
        <Switch>
            <Route exact path="/" component={requireNotAuth(Home)} />
            <Route path="/recipes" component={requireNotAuth(Recipes)} />
            <Route path="/about" component={requireNotAuth(About)} />
            <Route path="/contact" component={requireNotAuth(Contact)} />
            <Route path="/login" component={requireNotAuth(Login)} />
            {/* <Route path="/register" component={requireNotAuth(Login)} /> */}
            {/* <Route path="/profile" component={requireAuth(Login)} /> */}
        </Switch>
    </div>
);

export default App;