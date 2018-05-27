import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Button, Panel, Grid, Row } from 'react-bootstrap'

import Logout from './Logout'

class Profile extends React.Component {

    render() {
        const { user } = this.props;

        return (<div>
            <Grid>
                <Row>
                    <h3 className="user-heading">User profile page</h3>
                </Row>
            </Grid>
            <Panel>
                <Panel.Heading>User info</Panel.Heading>
                <Panel.Body>
                    <div className="user-info">
                        <b>Name</b>: {user.first_name}<br />
                        <b>Last name</b>: {user.last_name}<br />
                        <b>Email</b>: {user.email}
                    </div>
                    <div>
                        <Logout />
                    </div>
                </Panel.Body>
            </Panel>
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
