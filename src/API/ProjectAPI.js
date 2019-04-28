import { authHeader } from '../Helpers/AuthHeader';
import { handleResponse } from '../Helpers/HandleResponse';
import { getUrl } from '../Services/API.service';
import { employeeService } from './EmployeeAPI';

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
            return employeeService.getAll("PROJECTMANAGER").then(pms => {
                return projects.map(project => addPmToProject(project, pms))
            })
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
            return employeeService.get(project.projectManagerId).then(employee => addPmToProject(project, [employee]))
        })
}

function create(project) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(project)
    };

    return fetch(`${projectURL}`, requestOptions)
        .then(handleResponse)
        .then(project => {
            return employeeService.get(project.projectManagerId).then(employee => addPmToProject(project, [employee]))
        })
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
            return employeeService.get(project.projectManagerId).then(employee => addPmToProject(project, [employee]))
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

function addPmToProject(project, pms) {
    project.pm = pms.find(pm => pm.id === project.projectManagerId);
    return project;
}