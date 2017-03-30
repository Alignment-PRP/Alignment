import axios from 'axios';
import * as URLS from './../../config.jsx';
import {GET_ALL_PROJECTS,
        GET_PROJECT_BY_ID,
        GET_REQUIREMENTS_BY_PROJECT_ID,
        POST_REQUIREMENT_TO_PROJECT,
        DELETE_REQUIREMENT_TO_PROJECT,
        POST_PROJECT_NEW,
} from './../types.jsx';
import {
    changeProjectFormMode,
    snackBar,
} from './projectFormActions.jsx';

//All actions that changes the global state of the projectReducer is defined here.
//Async methods need to get defined in two separate functions because the axios.get
//method will take sometime before we want to send the data to the Reducer. This is made possible with react-thunk middleware.
export function getAllProjects() {
    return dispatch => {
        axios.get(URLS.PROJECTS)
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


//All actions returns a object with type: descriptive name of action,
//and payload: which hold the new data of the reducer(reducers holds the global state of the
//application.
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

export function postRequirementToProject(post){
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

export function deleteRequirementToProject(post){
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
 * @param {Object} data
 * @param {string} data.name
 * @param {boolean} data.isPublic
 * @param {string} data.securityLevel
 * @param {string} data.transactionVolume
 * @param {string} data.userChannel
 * @param {string} data.deploymentStyle
 * @returns {function(*)}
 */
export function postProjectNew(data){
    return dispatch => {
        axios.post(URLS.PROJECT_POST_NEW, data)
            .then(function (response) {
                dispatch(getAllProjects());
                dispatch(changeProjectFormMode(true));
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
