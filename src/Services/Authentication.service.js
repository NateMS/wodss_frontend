import { BehaviorSubject } from 'rxjs';

import jwt_decode from 'jwt-decode';
import { handleResponse } from './../Helpers/HandleResponse';
import { getUrl } from './API.service';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const url = getUrl();

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
    get currentUserRole() { return currentUserSubject.value.decoded.role },
    get isAdmin() { return currentUserSubject.value.decoded.role === 'ADMINISTRATOR' },
    get isPM(){ return currentUserSubject.value.decoded.role === 'PROJECTMANAGER' || this.isAdmin() }
};

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
            let item = JSON.stringify({decoded: decoded.employee, token: user.token});
            localStorage.setItem('currentUser', item);
            currentUserSubject.next(item);
            return user;
        });
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}