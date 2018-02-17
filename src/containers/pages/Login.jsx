import React from 'react'
import {
    Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button
} from 'react-bootstrap' 

import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { onValueChanged, sendContact } from './../../actions/contact';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class Login extends React.Component {

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
                                    />
                                    <FieldGroup
                                        id="formControlsPassword"
                                        type="password"
                                        label="Password"
                                        placeholder="Password"
                                        name="password"
                                    />
                                    <Button  bsStyle="primary">
                                        Login
                                    </Button>
                                </form>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Login;
