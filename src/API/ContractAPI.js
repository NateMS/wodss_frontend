import { authHeader } from '../Helpers/AuthHeader';
import { handleResponse } from '../Helpers/HandleResponse';
import { getUrl } from '../Services/API.service';

const contractURL = getUrl() + '/contract';

export const contractService = {
    getAll,
    get,
    create,
    update,
    remove
};

function getAll(fromDate, toDate) {
    let url = contractURL + '?'
    if (fromDate) url += `&fromDate=${fromDate}`
    if (toDate) url += `&toDate=${toDate}`

    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(url, requestOptions)
            .then(handleResponse)
            .then(contracts => {
                return contracts;
            })
}

function get(contractID) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${contractURL}/${contractID}`, requestOptions)
            .then(handleResponse)
            .then(contract => {
                return contract
            })
}

function create(contract) {
    const requestOptions = { 
        method: 'POST', 
        headers: authHeader(), 
        body: JSON.stringify(contract)
    };
    
    return fetch(`${contractURL}`, requestOptions)
            .then(handleResponse)
            .then(contract => {
                return contract;
            })
}

function update(contract) {
    const requestOptions = { 
        method: 'POST', 
        headers: authHeader(), 
        body: JSON.stringify(contract)
    };

    return fetch(`${contractURL}/${contract.id}`, requestOptions)
            .then(handleResponse)
            .then(contract => {
                return contract;
            })
}

function remove(contractID) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${contractURL}/${contractID}`, requestOptions)
            .then(handleResponse)
}