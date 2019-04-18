import { authHeader } from '../Helpers/AuthHeader';
import { handleResponse } from '../Helpers/HandleResponse';
import { getUrl } from '../Services/API.service';

const url = getUrl();

export const employeeService = {
    getAll,
    get,
    create,
    update,
    remove
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${url}/employee`, requestOptions).then(handleResponse);
}
function get(employeeId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }


    // return fetch(`${url}/employee/${employeeId}`, requestOptions)
    // .then(handleResponse)
    // .then(employee => {
    //     return JSON.stringify(employee);
    // })
    // .catch(error => console.error(error));

    return fetch(`${url}/employee/${employeeId}`, requestOptions).then(handleResponse);
}


function create(employee) {
    const requestOptions = { 
        method: 'POST', 
        headers: authHeader(), 
        body: JSON.stringify(employee)
    };

    return fetch(`${url}/employee`, requestOptions).then(handleResponse);
}

{

  }

function update(employee) {

}

function remove(employee) {
    
}