import { authHeader } from '../Helpers/AuthHeader';
import { handleResponse } from '../Helpers/HandleResponse';
import { getUrl } from '../Services/API.service';

const employeeURL = getUrl() + '/employee';

export const employeeService = {
    getAll,
    get,
    create,
    update,
    remove
};

function getAll(role) {
    let url = employeeURL + '?'
    if (role) url += `&role=${role}`

    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(employees => {
            return employees
        })
        .catch(error => console.error(error))
}

function get(employeeId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${employeeURL}/${employeeId}`, requestOptions)
        .then(handleResponse)
        .then(employee => {
            return employee;
        })
        .catch(error => console.error(error));
}

function create(employee, role, password) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(employee)
    };

    return fetch(`${employeeURL}?password=${password}&role=${role}`, requestOptions)
        .then(handleResponse)
        .then(employee => {
            return employee;
        })
        .catch(error => console.error(error));
}

function update(employee) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(employee)
    };

    return fetch(`${employeeURL}/${employee.id}`, requestOptions)
        .then(handleResponse)
        .then(employee => {
            return employee;
        })
        .catch(error => console.error(error));
}

function remove(employeeId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(`${employeeURL}/${employeeId}`, requestOptions)
        .then(handleResponse)
        .catch(error => console.error(error));
}