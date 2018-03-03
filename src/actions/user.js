import axios from 'axios'

export const SET_USER = 'SET_USER';
export const DESTROY_USER = 'DESTROY_USER';

function setUser(data, token) {
    return {
        data,
        token,
        type: SET_USER,
    };
}

function destroyUser() {
    return {
        type: DESTROY_USER,
    };
}

export function doLogin(credentials) {
    return (dispatch, getState) => {
        return axios.post('/api/login', credentials)
            .then(response => {
                const { data, token } = response; 

                if (data && token) {
                    dispatch(setUser(data, token));
                }
            })
            .catch(err => {
                console.log(err); // todo: implement
            });
    };
}

export function doLogout() {
    return (dispatch, getState) => {
        return axios.post('/api/logout')
            .then(response => {
                if (response.result) {
                    dispatch(destroyUser());
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function doRegister(data) {
    return (dispatch, getState) => {
        return axios.post('/api/register', data)
            .then(response => {
                if (response.result) {
                    // show message
                } else {
                    // show message
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
}