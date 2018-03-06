import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap' 

import { doLogout } from './../../actions/user'

class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.dispatch(doLogout());
    }

    render() {
        const count = React.Children.count(this.props.children);

        if (!count) {
            return <Button bsStyle="primary" onClick={this.onClick}>Logout</Button>
        }

        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { onClick: this.onClick }));
        
        return {...childrenWithProps};
    }
}

Logout.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Logout);