import { SET_MESSAGES, CLEAR_MESSAGES } from './../actions/info'

let initialState = {
    messages: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            };

        case CLEAR_MESSAGES:
            return {
                ...state,
                messages: [],
            };
            
        default:
            return state;
    }
}