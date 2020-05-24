import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwtHelper from "../utils/jwtHelper";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            JwtHelper.isTokenExist ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;