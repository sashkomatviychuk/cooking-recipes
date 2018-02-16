import axios from 'axios'

export const SET_CONTACT_FIELD = 'SET_CONTACT_FIELD';
export const CLEAR_CONTACT_FORM = 'CLEAR_CONTACT_FORM';

export const SEND_CONTACT_STARTED = 'SEND_CONTACT_STARTED';
export const SEND_CONTACT_FINISHED = 'SEND_CONTACT_FINISHED';
export const SEND_CONTACT_ERRORED = 'SEND_CONTACT_ERRORED';

function sendContactStarted() {
    return { type: SEND_CONTACT_STARTED };
}

function sendContactFinished() {
    return { type: SEND_CONTACT_FINISHED };
}

function sendContactErrored(error) {
    return {
        error,
        type: SEND_CONTACT_ERRORED,
    };
}

export const onValueChanged = (data) => {
    const { name, value } = data;

    return {
        name,
        value,
        type: SET_CONTACT_FIELD,
    };
}

export const sendContact = () => (dispatch, getState) => {
    const state = getState();
    const data = state.contact.contactData;

    dispatch(sendContactStarted());

    return axios.post('/contact', data)
        .then(result => dispatch(sendContactFinished()))
        .catch(err => dispatch(sendContactErrored(err)));
}