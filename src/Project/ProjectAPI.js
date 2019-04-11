import axios from "axios";

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
const ENDPOINT = 'project';
const SERVER_URL = 'http://localhost:3090/api';


export function fetchProjects() {
    const request = axios.get(`${SERVER_URL}/${ENDPOINT}/`, {
        headers: { authorization: localStorage.getItem('token') }
    })
    return {
        type: FETCH_PROJECTS,
        payload: request
    }
}

export function updateProject(props) {
    const request = axios.post(`${SERVER_URL}/${ENDPOINT}/${props.id}`, {
        headers: { authorization: localStorage.getItem('token') },
        props
    });

    return {
        type: CREATE_PROJECT,
        payload: request
    };
}

export function createProject(props, cb) {
    const request = axios.post(`${SERVER_URL}/${ENDPOINT}`, {
        headers: { authorization: localStorage.getItem('token') },
        props
    }).then(res => {
        cb();
        return res;
    });

    return {
        type: CREATE_PROJECT,
        payload: request
    };
}

export function fetchProject(id) {
    const request = axios.get(`${SERVER_URL}/${ENDPOINT}/${id}`, {
        headers: { authorization: localStorage.getItem('token') }
    })

    return {
        type: FETCH_PROJECT,
        payload: request
    }
}

export function deleteProject(id, cb) {
    const request = axios.delete(`${SERVER_URL}/${ENDPOINT}/${id}`, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(res => {
            cb();
            return res;
        });

    return {
        type: DELETE_PROJECT,
        payload: request
    }
}