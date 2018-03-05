import React from 'react'
import {
    Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { doRegister } from './../../actions/user'
import validate from './../../validators/register'
import FieldGroup from './../panels/FieldGroup'
import { showInfo, showError } from './../../actions/info'

let initialState = () => ({
    data: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    },
    errors: {},
});

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = initialState();

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const state = this.state;

        state.data[name] = value;

        this.setState({
            ...state,
        });
    }

    onClick() {
        const { data } = this.state;
        const errors = validate(data);

        if (!errors.length) {
            doRegister(data)
                .then(({ data }) => {
                    if (data.result) {
                        const newState = initialState();

                        this.setState({
                            ...newState,
                        });

                        this.props.dispatch(showInfo('Successfuly registered! Now you can log in'));
                    }
                });
        } else {
            const err = errors.shift();
            this.props.dispatch(showError(err.message));
        }
    }

    render() {
        const { data } = this.state;

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
                                        onChange={this.onChange}
                                        value={data.first_name}
                                        id="formControlsFirstName"
                                        type="text"
                                        label="First name"
                                        name="first_name"
                                        placeholder="First name"
                                        autoComplete="off"
                                    />
                                    <FieldGroup
                                        onChange={this.onChange}
                                        value={data.last_name}
                                        id="formControlsLastName"
                                        type="text"
                                        label="Last name"
                                        name="last_name"
                                        placeholder="Last name"
                                        autoComplete="off"
                                    />
                                    <FieldGroup
                                        onChange={this.onChange}
                                        value={data.email}
                                        id="formControlsEmail"
                                        type="email"
                                        label="Email"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="off"
                                    />
                                    <FieldGroup
                                        onChange={this.onChange}
                                        value={data.password}
                                        id="formControlsPassword"
                                        type="password"
                                        label="Password"
                                        placeholder="Password"
                                        name="password"
                                    />
                                    <FieldGroup
                                        onChange={this.onChange}
                                        value={this.state.data.confirm_password}
                                        id="formControlsConfirmPassword"
                                        type="password"
                                        label="Confirm password"
                                        placeholder="Confirm password"
                                        name="confirm_password"
                                    />
                                    <Button  bsStyle="success" onClick={this.onClick}>
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

export default connect()(Register);
