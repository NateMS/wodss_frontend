import { authHeader } from '../Helpers/AuthHeader';
import { handleResponse } from '../Helpers/HandleResponse';
import { getUrl } from '../Services/API.service';
import { projectService } from "../API/ProjectAPI";
const allocationURL = getUrl() + '/allocation';

export const allocationService = {
    getAll,
    get,
    create,
    update,
    remove
};

function getAll(query) {
    let url = allocationURL + '?'

    if (query) {
        if (query.hasOwnProperty('employeeId')) url += `&employeeId=${query['employeeId']}`
        if (query.hasOwnProperty('projectId')) url += `&projectId=${query['projectId']}`
        if (query.hasOwnProperty('fromDate')) url += `&fromDate=${query['fromDate']}`
        if (query.hasOwnProperty('toDate')) url += `&toDate=${query['toDate']}`
    }

    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(allocations => {
            projectService.getAll().then(projects => {
                allocations = allocations.map(allocation => {
                    return addProjectToAllocation(allocation, projects)
                  })
            })
            
            return allocations;
        })
}

function get(allocationID) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${allocationURL}/${allocationID}`, requestOptions)
        .then(handleResponse)
        .then(allocation => {
            projectService.get(allocation.projectId).then(project => {
                allocation = addProjectToAllocation(allocation, [project])
            })
            return allocation
        })
}

function create(allocation) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(allocation)
    };

    return fetch(`${allocationURL}`, requestOptions)
        .then(handleResponse)
        .then(allocation => {
            return allocation;
        })
}

function update(allocation) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(allocation)
    };

    console.log(allocation)
    console.log(`${allocationURL}/${allocation.id}`)

    return fetch(`${allocationURL}/${allocation.id}`, requestOptions)
        .then(handleResponse)
        .then(allocation => {
            return allocation;
        })
}

function remove(allocationID) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${allocationURL}/${allocationID}`, requestOptions)
        .then(handleResponse)
}

function addProjectToAllocation(allocation, projects) {
    allocation.project = projects.find(project => allocation.projectId === project.id);
    return allocation
}