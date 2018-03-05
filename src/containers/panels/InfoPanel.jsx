import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

import { hideMessage } from './../../actions/info'

class InfoPanel extends React.Component {

    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.dispatch(hideMessage());
    }

    render() {
        const { message, type } = this.props;
        const style = {
            display: message.length ? 'block' : 'none',
        }

        return (<Alert bsStyle={type} style={style} onDismiss={this.onClose}>
            {message}
        </Alert>);
    }
}

InfoPanel.propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    type: PropTypes.any,
};

const mapStateToProps = state => {
    return state.info || {};
};

export default connect(mapStateToProps)(InfoPanel);