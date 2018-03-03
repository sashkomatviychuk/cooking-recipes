import React from 'react'
import {
    Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { doRegister } from './../../actions/user';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class Register extends React.Component {

    render() {

        return (
            <Row>
                <Col md={12}>
                    <h3>
                        Registration
                    </h3>
                    <div>
                        <Row>
                            <Col md={6}>
                                <form>
                                    <FieldGroup
                                        id="formControlsFirstName"
                                        type="text"
                                        label="First name"
                                        name="first_name"
                                        placeholder="First name"
                                        autoComplete="off"
                                    />
                                    <FieldGroup
                                        id="formControlsLastName"
                                        type="text"
                                        label="Last name"
                                        name="last_name"
                                        placeholder="Last name"
                                        autoComplete="off"
                                    />
                                    <FieldGroup
                                        id="formControlsEmail"
                                        type="email"
                                        label="Email"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="off"
                                    />
                                    <FieldGroup
                                        id="formControlsPassword"
                                        type="password"
                                        label="Password"
                                        placeholder="Password"
                                        name="password"
                                    />
                                    <FieldGroup
                                        id="formControlsConfirmPassword"
                                        type="password"
                                        label="Confirm password"
                                        placeholder="Confirm password"
                                        name="confirm_password"
                                    />
                                    <Button  bsStyle="success">
                                        Register
                                    </Button>
                                    <span> or </span>
                                    <LinkContainer to="/login">
                                        <Button  bsStyle="primary">
                                            Login
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

export default Register;
