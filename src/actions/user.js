import axios from 'axios'
import { showError } from './info'

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
                const { data, token } = response.data;

                if (data && token) {
                    dispatch(setUser(data, token));
                }
            })
            .catch(err => {
                dispatch(showError('Bad login or password'));
            });
    };
}

export const doLogout = function doLogout() {
    return (dispatch, getState) => {
        return axios.post('/api/logout')
            .then(response => {
                const { result } = response.data;

                if (result) {
                    dispatch(destroyUser());
                } else {
                    dispatch(showError('Logout failed. Try again'));
                }
            })
            .catch(() => {
                dispatch(showError('Logout failed. Try again'));
            });
    }
}

export const doRegister = function doRegister(data) {
    return axios.post('/api/register', data);
}