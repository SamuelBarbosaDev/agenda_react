import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Login from '../pages/Login';
import Page404 from '../pages/404';

export default function Routes(){
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='*' component={Page404} />
        </Switch>
    )
}
