import React from 'react'

import { Link } from "react-router-dom"
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Header extends React.Component {

    render() {
        const { isLoggedIn } = this.props;

        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Cooking recipes</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer exact to="/">
                            <NavItem eventKey={1}>Home</NavItem>
                        </LinkContainer>
                        <LinkContainer exact to="/recipes">
                            <NavItem eventKey={2}>Recipes</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <NavItem eventKey={3}>About</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <NavItem eventKey={4}>Contact</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        {!isLoggedIn && <LinkContainer to="/login">
                            <NavItem eventKey={6}>Login</NavItem>
                        </LinkContainer>}
                        {isLoggedIn && <LinkContainer to="#">
                            <NavItem eventKey={7}>Profile</NavItem>
                        </LinkContainer>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => {
    return state.user || {};
};

export default connect(mapStateToProps, null, null, {pure:false})(Header);
