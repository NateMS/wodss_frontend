import { authHeader } from '../Helpers/AuthHeader';
import { handleResponse } from '../Helpers/HandleResponse';
import { getUrl } from '../Services/API.service';

const projectURL = getUrl() + '/project';

export const projectService = {
    getAll,
    get,
    create,
    update,
    remove
};

function getAll(projectManagerId, fromDate, toDate) {
    let url = projectURL + '?'
    if (projectManagerId) url += `&projectManagerId=${projectManagerId}`
    if (fromDate) url += `&fromDate=${fromDate}`
    if (toDate) url += `&toDate=${toDate}`

    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(url, requestOptions)
            .then(handleResponse)
            .then(projects => {
                return projects;
            })
}

function get(projectId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${projectURL}/${projectId}`, requestOptions)
            .then(handleResponse)
            .then(project => {
                return project;
            })
}

function create(project) {
    const requestOptions = { 
        method: 'POST', 
        headers: authHeader(), 
        body: JSON.stringify(project)
    };

    console.log(JSON.stringify(project))

    return fetch(`${projectURL}`, requestOptions)
            .then(handleResponse)
    }

function update(project) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(project)
    };

    return fetch(`${projectURL}/${project.id}`, requestOptions)
            .then(handleResponse)
            .then(project => {
                return project;
            })
}

function remove(projectId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(`${projectURL}/${projectId}`, requestOptions)
            .then(handleResponse)
}