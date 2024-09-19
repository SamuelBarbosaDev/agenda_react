import React from "react";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from '../pages/Login';
import Page404 from '../pages/404';
import MyRoute from "./MyRoute";

export default function Routes(){
    return (
        <Switch>
            <MyRoute exact path='/' component={Login} isClosed />
            <MyRoute path='*' component={Page404} />
        </Switch>
    )
}
