import * as actionType from "./userActionTypes";

let userDetails = localStorage.getItem('app-user-details');
let parsedUserDetails = userDetails ? JSON.parse(userDetails) : null;

export interface UserState {
    role: string;
    userId: string;
    userName: string;
    isLoggedIn: boolean;
    isError: boolean;
    isLoading: boolean;
    loginAttemptFailed: boolean;
}

const initialState: UserState = {
    role: parsedUserDetails ? parsedUserDetails.role : '',
    userId: parsedUserDetails ? parsedUserDetails.userId : '',
    userName: parsedUserDetails ? parsedUserDetails.userName : '',
    isLoggedIn: parsedUserDetails ? true : false,
    isError: false,
    isLoading: false,
    loginAttemptFailed: false
};

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.USER_LOGIN:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: true
            };
        case actionType.USER_LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
                isError: true,
                loginAttemptFailed: true
            };
        case actionType.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                isError: false,
                loginAttemptFailed: false
            };
        case actionType.USER_LOGOUT:
            return {
                ...state,
                isLoading: true
            };
        case actionType.USER_LOGOUT_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false
            };
        case actionType.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                role: '',
                userId: '',
                muid: '',
                userName: '',
                isLoading: false,
                isError: false,
                isLoggedIn: false
            };
        default:
            return state
    }
}
