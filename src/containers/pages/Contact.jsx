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

class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    componentDidMount() {
        const { text, email, name } = this.props.contactData || {};

        this.name.value = name || '';
        this.email.value = email || '';
        this.text.value = text || '';
    }

    onChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.props.dispatch(onValueChanged({ name, value }));
    }

    onSend() {
        this.props.dispatch(sendContact());
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h3>
                        Contact us
                    </h3>
                    <div>
                        <Row>
                            <Col md={6}>
                                <form>
                                    <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Name"
                                        name="name"
                                        placeholder="Your name"
                                        onChange={this.onChange}
                                        inputRef={(input) => this.name = input}
                                        autoComplete="off"
                                    />
                                    <FieldGroup
                                        id="formControlsEmail"
                                        type="email"
                                        label="Email address"
                                        placeholder="Your email"
                                        name="email"
                                        onChange={this.onChange}
                                        inputRef={(input) => this.email = input}
                                    />
                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>Message</ControlLabel>
                                        <FormControl
                                            name="text"
                                            componentClass="textarea"
                                            placeholder="Message"
                                            onChange={this.onChange}
                                            inputRef={(input) => this.text = input}
                                        />
                                    </FormGroup>
                                    <Button  bsStyle="primary" onClick={this.onSend}>
                                        Send
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

Contact.propTypes = {
    dispatch: PropTypes.func.isRequired,
    sending: PropTypes.bool,
    error: PropTypes.any,
    contactData: PropTypes.object,
};

const mapStateToProps = state => {
    return state.contact || {};
};

export default connect(mapStateToProps)(Contact);
