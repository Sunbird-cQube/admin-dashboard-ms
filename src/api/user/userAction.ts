import * as actionTypes from "./userActionTypes";
import axios from 'axios';
import store from '../../store';
import FormData from "form-data";

const apiUrl = process.env.REACT_APP_API_URL;
const baseHref = process.env.REACT_APP_BASE_HREF;
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

export const login = (data: { username: string, password: string, grant_type: string }) => {
    const header = { headers: { Authorization: `Basic ${process.env.REACT_APP_AUTH_CODE}` } };
    const params = new FormData();
    params.append("grant_type", 'password');
    params.append("username", data.username);
    params.append("password", data.password);

    return (dispatch: any) => {
        dispatch(userLoginInit());
        axios.post(`${apiUrl}/login`, params, header)
            .then((response) => {
                console.log("Response: ", response);
                //dispatch(getUserDetail(response.data.access_token));
                // localStorage.setItem('app-user-details', JSON.stringify(response.data.data));
                // dispatch(userLoginSuccess(response.data.data));
            })
            .catch(function (error) {
                dispatch(userLoginFailure());
            })
    };
};

export const logout = () => {
    const header = { headers: { user: userId, Authorization: `Bearer ${localStorage.getItem("token")}` } };

    return (dispatch: any) => {
        dispatch(userLoginInit());
        localStorage.removeItem('token');
        localStorage.removeItem('app-user-details');
        axios.post(`${apiUrl}/user-logout`, {}, header)
            .then((response: any) => {
                // window.location.href = "/bosch-aic/#/login";
                // window.location.href = process.env.REACT_APP_MAIN_DOMAIN_URL || '/';
                window.location.href = '/login';
                dispatch(userLogoutSuccess());
            })
            .catch(function (error) {
                dispatch(userLogoutFailure());
            });
    };
};
