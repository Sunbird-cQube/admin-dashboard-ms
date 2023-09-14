import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('app-user-details') as string));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout
};

function login(username: string, password: string) {
    return axios.post(`${apiUrl}/admin/login`, { username, password })
        .then(userDetails => {
            userSubject.next(userDetails);
            localStorage.setItem('app-user-details', JSON.stringify(userDetails));

            return userDetails;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('app-user-details');
    userSubject.next(null);
    Router.push('/login');
}
