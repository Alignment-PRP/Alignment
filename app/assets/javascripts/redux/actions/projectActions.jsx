import axios from 'axios';
import * as URLS from './../../config.jsx';
import {GET_ALL_PROJECTS,
        GET_PROJECT_BY_ID,
        GET_REQUIREMENTS_BY_PROJECT_ID
} from './../types.jsx';

export function getAllProjects() {
    return dispatch => {
        axios.get(URLS.PROJECTS_GET_USER)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getAllProjectsAsync(data))
            });

    }

}

function getAllProjectsAsync(data) {
    return {
        type: GET_ALL_PROJECTS,
        payload: data
    }
}


export function getProjectById(id) {
    return dispatch => {
        axios.get(URLS.PROJECT_GET_BY_ID + id)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getProjectByIdAsync(data))
            });

    }
}

function getProjectByIdAsync(data) {
    return {
        type: GET_PROJECT_BY_ID,
        payload: data
    }
}

export function getRequirementsByProjectId(id) {
    return dispatch => {
        axios.get(URLS.PROJECT_REQUIREMENTS_GET_BY_ID + id)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getRequirementsByProjectIdAsync(data))
            });

    }

}

function getRequirementsByProjectIdAsync(data) {
    return {
        type: GET_REQUIREMENTS_BY_PROJECT_ID,
        payload: data
    }
}
