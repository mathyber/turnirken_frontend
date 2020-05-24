import React, { Fragment } from 'react';

import MainRouter from "./routes/mainRouter";
import Header from "./containers/header";
import selector from "./selectors";
import { connect } from "react-redux";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <MainRouter/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: selector.auth.isAuth(state)
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App)