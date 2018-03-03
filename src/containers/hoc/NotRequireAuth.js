import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {

    class NotAuthentication extends React.Component {

        componentWillMount() {
            if (this.props.isLoggedIn) {
                browserHistory.push('/profile');
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.isLoggedIn) {
                browserHistory.push('/profile');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    NotAuthentication.propTypes = {
        isLoggedIn: PropTypes.bool
    };

    function mapStateToProps(state) {
        return { isLoggedIn: state.user.isLoggedIn };
    }

    return connect(mapStateToProps)(NotAuthentication);
}