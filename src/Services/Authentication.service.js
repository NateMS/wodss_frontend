import { BehaviorSubject } from 'rxjs';

import jwt_decode from 'jwt-decode';
import { handleResponse } from './../Helpers/HandleResponse';
import { getUrl } from './API.service';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
const url = getUrl();

export const authenticationService = {
    login,
    logout,
    isAdmin,
    isPM,
    currentUserValue,
    currentUserRole,
    currentUser: currentUserSubject,
};

export function isAdmin() {
    return currentUserSubject.value.decoded.role === 'ADMINISTRATOR'
}
export function isPM() {
    return currentUserSubject.value.decoded.role === 'PROJECTMANAGER' || this.isAdmin()
}
export function currentUserValue() {
    return currentUserSubject.value
}
export function currentUserRole() {
    return currentUserSubject.value.decoded.role
}

export function login(email, password) {
    const credentials = { emailAddress: email, rawPassword: password }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    };

    return fetch(`${url}/token`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            let decoded = jwt_decode(user.token);
            let item = JSON.stringify({ decoded: decoded.employee, token: user.token });
            localStorage.setItem('currentUser', item);
            currentUserSubject.next(item);
            return item;
        });
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}