import { SHOW_MESSAGE, HIDE_MESSAGE } from './../actions/info'

let initialState = {
    message: '',
    type: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MESSAGE:
            return {
                ...state,
                message: action.message,
                type: action.style,
            };

        case HIDE_MESSAGE:
            return {
                ...state,
                message: '',
                type: null,
            };
            
        default:
            return state;
    }
}