import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

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
            <Route exact path="/" component={Home} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
        </Switch>
    </div>
);

export default App;