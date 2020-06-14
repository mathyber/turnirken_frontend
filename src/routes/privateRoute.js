import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwtHelper from "../utils/jwtHelper";
import {LOGIN_LINK} from "./link";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            JwtHelper.isTokenExist ?
                <Component {...props} />
                : <Redirect to={LOGIN_LINK} />
        )} />
    );
};

export default PrivateRoute;