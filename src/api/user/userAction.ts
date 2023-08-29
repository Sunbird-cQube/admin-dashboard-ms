import * as actionTypes from "./userActionTypes";
import axios from 'axios';
import store from '../../store';

const apiUrl = process.env.REACT_APP_API_URL;
const userId = store.getState().userPage.userId;

export const userLoginInit = () => ({
    type: actionTypes.USER_LOGIN
});

export const userLoginFailure = () => ({
    type: actionTypes.USER_LOGIN_FAILURE
});

export const userLoginSuccess = (data: any) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: { data }
});

export const userLogoutInit = () => ({
    type: actionTypes.USER_LOGOUT
});

export const userLogoutFailure = () => ({
    type: actionTypes.USER_LOGOUT_FAILURE
});

export const userLogoutSuccess = () => ({
    type: actionTypes.USER_LOGOUT_SUCCESS
});

export const login = (data: { username: string, password: string }) => {
    const payload = {
        username: data.username,
        password: data.password
    }

    return (dispatch: any) => {
        dispatch(userLoginInit());
        axios.post(`${apiUrl}/admin/login`, payload)
            .then((response) => {
                localStorage.setItem('app-user-details', JSON.stringify(response.data));
                dispatch(userLoginSuccess(response.data));
            })
            .catch(function (error) {
                dispatch(userLoginFailure());
            })
    };
};

export const logout = () => {
    const userDetails = JSON.parse(localStorage.getItem('app-user-details') as string);
    const header = { headers: { user: userId, Authorization: `Bearer ${userDetails.access_token}` } };

    return (dispatch: any) => {
        dispatch(userLoginInit());
        
        axios.post(`${apiUrl}/logout`, { refresh_token: userDetails.refresh_token }, header)
            .then((response: any) => {
                localStorage.removeItem('app-user-details');
                window.location.href = '/login';
                dispatch(userLogoutSuccess());
            })
            .catch(function (error) {
                localStorage.removeItem('app-user-details');
                window.location.href = '/login';
                dispatch(userLogoutFailure());
            });
    };
};
