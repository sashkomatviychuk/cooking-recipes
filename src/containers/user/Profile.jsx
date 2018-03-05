import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class Profile extends React.Component {
    render() {
        return (<div>
            User profile page
        </div>)
    }
}

Profile.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object,
    token: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        token: state.user.token,
        user: state.user.data,
    };
};

export default connect(mapStateToProps)(Profile);
