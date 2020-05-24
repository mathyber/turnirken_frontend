import React from "react";
import {GRID_PAGE_LINK, LOGIN_LINK, PROFILE_LINK, REG_LINK} from "./link";
import LoginForm from "../containers/login/login_form.jsx";
import RegForm from "../containers/login/registration_form.jsx";
import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import JwtHelper from "../utils/jwtHelper";

function MainRouter() {
    return (
        <Switch>
            <Route path={LOGIN_LINK} render={() => JwtHelper.isTokenExist ?
                <Redirect to={{pathname: {PROFILE_LINK}}} /> : <LoginForm />} />
            <Route path={REG_LINK} render={() => JwtHelper.isTokenExist ?
                <Redirect to={{pathname: {PROFILE_LINK}}} /> : <RegForm />} />
            <PrivateRoute path={GRID_PAGE_LINK} />
        </Switch>
    );
}

export default MainRouter