import {
    SET_CONTACT_FIELD,
    CLEAR_CONTACT_FORM,
    SEND_CONTACT_STARTED,
    SEND_CONTACT_FINISHED,
    SEND_CONTACT_ERRORED
} from './../actions/contact'

let initialState = {
    sending: false,
    error: null,
    contactData: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACT_FIELD:
            const contactData = state.contactData;
            contactData[action.name] = action.value;
            
            return {
                ...state,
                contactData,
            };

        case CLEAR_CONTACT_FORM:
            return initialState;

        case SEND_CONTACT_STARTED:
            return {
                ...state,
                sending: true,
            };

        case SEND_CONTACT_FINISHED:
            return {
                ...state,
                sending: false,
                error: null,
            };
        
        case SEND_CONTACT_ERRORED:
            return {
                ...state,
                sending: false,
                error: action.error,
            };

        default:
            return state;
    }
}