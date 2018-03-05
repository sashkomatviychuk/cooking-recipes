import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

export default function (ComposedComponent) {

    class Authentication extends React.Component {

        render() {
            if (this.props.isLoggedIn) {
                return <ComposedComponent {...this.props} />
            }

            return <Redirect to="/login" />
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