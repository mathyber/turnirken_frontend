import React from "react";
import {Dropdown, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {LOGIN_LINK, ME_LINK, PROFILE_LINK, REG_LINK, TOURNAMENTS_LINK} from "../../routes/link";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import JwtHelper from "../../utils/jwtHelper";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
       if (JwtHelper.isTokenExist) this.props.getUserProfile();
        console.log(this.props.isAuth)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       if (prevProps.isAuth !== this.props.isAuth && this.props.isAuth) {
            this.props.getUserProfile();
       }
    }

    onClick() {
        this.props.logout(this.props.history);
    }

//{console.log(this.props.appConfig)}

    render() {

        return (
            <header className="header">
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Navbar.Brand href={TOURNAMENTS_LINK}><b>ТУРНИРКЕН</b></Navbar.Brand>

                        {
                            JwtHelper.isTokenExist &&
                                <DropdownButton id="dropdown-basic-button" title={
                                    this.props.userProfile.login ? this.props.userProfile.login : "user"
                                }>
                                    <Dropdown.Item onClick={() => this.props.history.push(ME_LINK)}>Профиль</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>this.onClick()}>Выйти</Dropdown.Item>
                                </DropdownButton>
                        }
                </Navbar>
            </header>
        )
    }
}

export default Header;