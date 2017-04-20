import axios from 'axios';
import * as URLS from './../../config';
import {GET_PUBLIC_PROJECTS,
        GET_PRIVATE_PROJECTS,
        GET_ARCHIVED_PROJECTS,
        GET_PROJECT_BY_ID,
        GET_REQUIREMENTS_BY_PROJECT_ID,
        POST_REQUIREMENT_TO_PROJECT,
        DELETE_REQUIREMENT_TO_PROJECT,
        DELETE_PROJECT,
        POST_PROJECT_NEW,
        CHANGE_PROJECTS_TABLE_MODE
} from './../types';
import {
    snackBar
} from './snackBarActions';

/**
 * <p>
 * All actions that changes the global state of the projectReducer is defined here.
 * Async methods need to get defined in two separate functions because the axios.get
 * method will take sometime before we want to send the data to the Reducer.
 * This is made possible with react-thunk middleware.
 * </p>
 *
 * <p>
 * All actions returns a object with type: descriptive name of action,
 * and payload: which hold the new data of the reducer(reducers holds the global state of the
 * application.
 * </p>
 * @module redux/actions/project
 */

export function getPublicProjects() {
    return dispatch => {
        axios.get(URLS.PROJECTS)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getPublicProjectsAsync(data))
            });

    }

}

function getPublicProjectsAsync(data) {
    return {
        type: GET_PUBLIC_PROJECTS,
        payload: data
    }
}

export function getPrivateProjects() {
    return dispatch => {
        axios.get(URLS.PROJECTS_GET_USER)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getPrivateProjectsAsync(data))
            });

    }

}

function getPrivateProjectsAsync(data) {
    return {
        type: GET_PRIVATE_PROJECTS,
        payload: data
    }
}


export function getArchivedProjects() {
    return dispatch => {
        axios.get(URLS.PROJECTS_GET_USER)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getArchivedProjectsAsync(data))
            });

    }

}

function getArchivedProjectsAsync(data) {
    return {
        type: GET_ARCHIVED_PROJECTS,
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

export function postRequirementToProject(projectID, requirement){
    const post = {
        ...requirement,
        PID: projectID
    };
    return dispatch => {
        axios.post(URLS.PROJECT_REQUIREMENT_POST_ADD, post)
            .then(function (response) {
                console.log(response);
                dispatch(getRequirementsByProjectId(post.PID));
            })
            .catch(function (error) {
                console.log(error);
            });
            dispatch(postRequirementToProjectAsync())
    }
}

function postRequirementToProjectAsync() {
    return {
        type: POST_REQUIREMENT_TO_PROJECT
    }
}

export function deleteRequirementToProject(projectID, requirement){
    const post = {
        ...requirement,
        PID: projectID
    };
    return dispatch => {
        axios.post(URLS.PROJECT_REQUIREMENT_POST_DELETE, post)
            .then(function (response) {
                console.log(response);
                dispatch(getRequirementsByProjectId(post.PID));
            })
            .catch(function (error) {
                console.log(error);
            });
        dispatch(deleteRequirementToProjectAsync())
    }
}

function deleteRequirementToProjectAsync() {
    return {
        type: DELETE_REQUIREMENT_TO_PROJECT
    }
}

/**
 * @param {Project} data
 * @returns {function(*)}
 */
export function postProjectNew(data){
    return dispatch => {
        axios.post(URLS.PROJECT_POST_NEW, data)
            .then(function (response) {
                dispatch(getPublicProjects());
                dispatch(snackBar(true, "Prosjekt laget!"));
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
                console.log(error);
            });
        dispatch(postProjectNewAsync())
    }
}

function postProjectNewAsync() {
    return {
        type: POST_PROJECT_NEW,
    }
}


/**
 * @param {string} mode
 * @returns {{type, payload: *}}
 */
export function changeProjectsTableMode(mode) {
    return {
        type: CHANGE_PROJECTS_TABLE_MODE,
        payload: mode
    }
}

export function deleteProject(project){

    //Create JSON
    const post = {
        PID: project.PID
    };

    return dispatch => {
        axios.post(URLS.PROJECT_DELETE_BY_ID, post)
            .then(function (response) {
                dispatch(getPublicProjects());
                dispatch(getPrivateProjects());
                dispatch(getArchivedProjects());
                dispatch(snackBar(true, "Prosjekt slettet!"));
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
                console.log(error);
            });
        dispatch(deleteProjectAsync())
    }
}

function deleteProjectAsync(){
    return{
        type: DELETE_PROJECT
    }
}
