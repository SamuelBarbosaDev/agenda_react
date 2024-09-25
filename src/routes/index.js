import React from "react";
import MyRoute from "./MyRoute";
import Login from '../pages/Login';
import Page404 from '../pages/404';
import Aluno from '../pages/Aluno';
import Fotos from '../pages/Fotos';
import Alunos from '../pages/Alunos';
import Register from '../pages/Register';
import { Switch } from "react-router-dom/cjs/react-router-dom.min";


export default function Routes(){
    return (
        <Switch>
            <MyRoute exact path='/' component={Alunos} isClosed={false} />
            <MyRoute exact path='/aluno/:id/edit' component={Aluno} isClosed />
            <MyRoute exact path='/aluno/' component={Aluno} isClosed />
            <MyRoute exact path='/fotos/:id' component={Fotos} isClosed />
            <MyRoute exact path='/login/' component={Login} isClosed={false} />
            <MyRoute exact path='/register/' component={Register} isClosed={false} />
            <MyRoute path='*' component={Page404} />
        </Switch>
    )
}
