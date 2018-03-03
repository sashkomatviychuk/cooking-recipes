import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class InfoPanel extends React.Component {

    render() {
        const { messages } = this.props;
        const style = {
            display: messages.length ? 'block' : 'none',
        }

        return (<div className="messages-panel" style={style}>
            <ul>
                {messages.map(e => (<li>{e}</li>))}
            </ul>
        </div>);
    }
}

InfoPanel.propTypes = {
    dispatch: PropTypes.func.isRequired,
    messages: PropTypes.any,
};

const mapStateToProps = state => {
    return state.info || {};
};

export default connect(mapStateToProps)(InfoPanel);