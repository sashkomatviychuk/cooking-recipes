import React from 'react'
import {
    Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button
} from 'react-bootstrap' 
import { LinkContainer } from 'react-router-bootstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import FieldGroup from './../panels/FieldGroup'
import { showInfo, showError } from './../../actions/info'
import { doLogin } from './../../actions/user'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.email = {};
        this.password = {};
    }

    onClick() {
        const credentials = {
            email: this.email.value,
            password: this.password.value,
        };

        this.props.dispatch(doLogin(credentials));
    }

    render() {

        return (
            <Row>
                <Col md={12}>
                    <h3>
                        Login to your account
                    </h3>
                    <div>
                        <Row>
                            <Col md={6}>
                                <form>
                                    <FieldGroup
                                        id="formControlsEmail"
                                        type="email"
                                        label="Email"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="off"
                                        inputRef={(input) => this.email = input}
                                    />
                                    <FieldGroup
                                        id="formControlsPassword"
                                        type="password"
                                        label="Password"
                                        placeholder="Password"
                                        name="password"
                                        inputRef={(input) => this.password = input}
                                    />
                                    <Button  bsStyle="success" onClick={this.onClick}>
                                        Login
                                    </Button>
                                    <span> or </span>
                                    <LinkContainer to="/register">
                                        <Button  bsStyle="primary">
                                            Register
                                        </Button>
                                    </LinkContainer>
                                </form>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default connect()(Login);
