import React from "react";
import {
    GRID_PAGE_LINK,
    LOGIN_LINK,
    PROFILE_LINK,
    REG_LINK,
    TOURNAMENT_CREATE_LINK, TOURNAMENT_ORGANIZER_PANEL_LINK,
    TOURNAMENT_SETTINGS_LINK,
    TOURNAMENTS_LINK
} from "./link";
import LoginForm from "../containers/login/login_form.jsx";
import RegForm from "../containers/login/registration_form.jsx";
import TournamentPage from "../containers/tournaments/tounaments_page";
import TournamentCreatePage from "../containers/tournaments/tounament_create_page";
import TournamentSettings from "../containers/tournaments/tounament_settings";
import TournamentOrg from "../containers/tournaments/tounament_organizer_panel";
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
            <Route path={TOURNAMENTS_LINK} component={TournamentPage}/>
            <PrivateRoute path={TOURNAMENT_CREATE_LINK} component={TournamentCreatePage}/>
            <PrivateRoute path={TOURNAMENT_SETTINGS_LINK} component={TournamentSettings}/>
            <PrivateRoute path={TOURNAMENT_ORGANIZER_PANEL_LINK} component={TournamentOrg}/>
            <PrivateRoute path={GRID_PAGE_LINK} />
        </Switch>
    );
}

export default MainRouter