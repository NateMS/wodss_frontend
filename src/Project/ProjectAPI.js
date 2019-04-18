import { authHeader } from '../Helpers/AuthHeader';
import { handleResponse } from '../Helpers/HandleResponse';
import { getUrl } from '../Services/API.service';

const url = getUrl();

export const projectService = {
    getAll,
    get,
    create,
    update,
    remove
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${url}/project`, requestOptions).then(handleResponse);
}

function get(project) {

}

function create(project) {
    const requestOptions = { method: 'PUT', headers: authHeader(), body: {
        "name": "IP5: Distributed IOT systems",
        "ftePercentage": 1500,
        "startDate": "2019-03-13",
        "endDate": "2019-06-13",
        "projectManagerId": "5"
      }};
    console.log(requestOptions);
    return fetch(`${url}/project`, requestOptions).then(handleResponse);
}

function update(project) {

}

function remove(project) {
    
}