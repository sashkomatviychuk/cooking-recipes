import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {

    class Authentication extends React.Component {

        componentWillMount() {
            if (!this.props.isLoggedIn) {
                browserHistory.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isLoggedIn) {
                browserHistory.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    Authentication.propTypes = {
        isLoggedIn: PropTypes.bool
    };

    function mapStateToProps(state) {
        return { isLoggedIn: state.user.isLoggedIn };
    }

    return connect(mapStateToProps)(Authentication);
}