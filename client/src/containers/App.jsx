import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from 'containers/Header';
import Home from 'containers/Home';
import Recipes from 'containers/recipes/Recipes'
import About from 'containers/pages/About'
import Contact from 'containers/pages/Contact'
import Login from 'containers/pages/Login'

const App = (props) => (
    <BrowserRouter>
        <div className="container">
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/recipes" component={Recipes} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;