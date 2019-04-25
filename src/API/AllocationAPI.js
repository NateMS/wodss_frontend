import { authHeader } from '../Helpers/AuthHeader';
import { handleResponse } from '../Helpers/HandleResponse';
import { getUrl } from '../Services/API.service';

const allocationURL = getUrl() + '/allocation';

export const allocationService = {
    getAll,
    get,
    create,
    update,
    remove
};

function getAll(employeeId, projectId, fromDate, toDate) {
    let url = allocationURL + '?'
    if (employeeId) url += `&employeeId=${employeeId}`
    if (projectId) url += `&projectId=${projectId}`
    if (fromDate) url += `&fromDate=${fromDate}`
    if (toDate) url += `&toDate=${toDate}`

    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(url, requestOptions)
            .then(handleResponse)
            .then(allocations => {
                return allocations;
            })
            .catch(error => console.error(error));
}

function get(allocationID) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${allocationURL}/${allocationID}`, requestOptions)
            .then(handleResponse)
            .then(allocation => {
                return allocation
            })
            .catch(error => console.error(error));
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
            .catch(error => console.error(error));
}

function update(allocation) {
    const requestOptions = { 
        method: 'POST', 
        headers: authHeader(), 
        body: JSON.stringify(allocation)
    };

    return fetch(`${allocationURL}/${allocation.id}`, requestOptions)
            .then(handleResponse)
            .then(allocation => {
                return allocation;
            })
            .catch(error => console.error(error));
}

function remove(allocationID) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${allocationURL}/${allocationID}`, requestOptions)
            .then(handleResponse)
            .catch(error => console.error(error));
}