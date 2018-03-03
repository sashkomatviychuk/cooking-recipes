import { SET_USER, DESTROY_USER } from './../actions/user'

let initialState = {
    isLoggedIn: false,
    data: {},
    token: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isLoggedIn: true,
                data: action.data,
                token: action.token,
            };

        case DESTROY_USER:
            return {
                ...state,
                ...initialState,
            };
            
        default:
            return state;
    }
};