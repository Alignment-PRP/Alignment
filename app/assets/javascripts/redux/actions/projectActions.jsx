import axios from 'axios';
import * as URLS from './../../config';
import { SENT, RECEIVED, ERROR } from './../utility';
import {
    GET_PROJECTS_PUBLIC,
    GET_PROJECTS_ACCESSIBLE,
    GET_PROJECTS_IS_CREATOR,
    GET_PROJECTS_IS_MANAGER,
    POST_NEW_PROJECT,
    POST_DELETE_PROJECT,

    GET_PROJECT_BY_ID,
    GET_REQUIREMENTS_BY_PROJECT_ID,
    POST_REQUIREMENT_TO_PROJECT,
    DELETE_REQUIREMENT_TO_PROJECT,
    CHANGE_PROJECTS_TABLE_MODE
} from './../types';
import {
    snackBar
} from './snackBarActions';
import { updateFilterRequirementList } from './filterActions';

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

export function getProjectsPublic() {
    return dispatch => {
        axios.get(URLS.PROJECTS_GET_PUBLIC)
            .then( response => {
                dispatch(RECEIVED(GET_PROJECTS_PUBLIC, response))
            })
            .catch(error => {
                dispatch(ERROR(GET_PROJECTS_PUBLIC, error))
            });
        dispatch(SENT(GET_PROJECTS_PUBLIC))
    }

}

export function getProjectsAccessible() {
    return dispatch => {
        axios.get(URLS.PROJECTS_GET_ACCESSIBLE)
            .then(response => {
                dispatch(RECEIVED(GET_PROJECTS_ACCESSIBLE, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_PROJECTS_ACCESSIBLE, error));
            });
        dispatch(SENT(GET_PROJECTS_ACCESSIBLE))
    }
}

export function getProjectsIsCreator() {
    return dispatch => {
        axios.get(URLS.PROJECTS_GET_IS_CREATOR)
            .then(response => {
                dispatch(RECEIVED(GET_PROJECTS_IS_CREATOR, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_PROJECTS_IS_CREATOR, error));
            });
        dispatch(SENT(GET_PROJECTS_IS_CREATOR))
    }
}

export function getProjectsIsManager() {
    return dispatch => {
        axios.get(URLS.PROJECTS_GET_IS_MANAGER)
            .then(response => {
                dispatch(RECEIVED(GET_PROJECTS_IS_MANAGER, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_PROJECTS_IS_MANAGER, error));
            });
        dispatch(SENT(GET_PROJECTS_IS_MANAGER))
    }
}


export function getProjectById(id) {
    return dispatch => {
        axios.get(URLS.PROJECT_GET_BY_ID.replace(':id', id))
            .then( response => {
                dispatch(RECEIVED(GET_PROJECT_BY_ID, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_PROJECT_BY_ID, error));
            });
        dispatch(SENT(GET_PROJECT_BY_ID));
    }
}

export function getRequirementsByProjectId(id) {
    return dispatch => {
        axios.get(URLS.PROJECT_REQUIREMENTS_GET_BY_ID.replace(':id', id))
            .then( response => {
                dispatch(RECEIVED(GET_REQUIREMENTS_BY_PROJECT_ID, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_REQUIREMENTS_BY_PROJECT_ID, error));
            });
        dispatch(SENT(GET_REQUIREMENTS_BY_PROJECT_ID));
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

export function postRequirementToProjectWithFilter(projectID, requirement, filter, comp){
    const post = {
        ...requirement,
        PID: projectID
    };
    return dispatch => {
        axios.post(URLS.PROJECT_REQUIREMENT_POST_ADD, post)
            .then((response) => {
                dispatch(getRequirementsByProjectIdWithFilter(post.PID, filter, comp));
            })
            .catch((error) => {
                console.log(error);
            });
        dispatch(postRequirementToProjectAsync())
    }
}

export function getRequirementsByProjectIdWithFilter(id, filter, comp) {
    return dispatch => {
        axios.get(URLS.PROJECT_REQUIREMENTS_GET_BY_ID.replace(':id', id))
            .then((response) => {
                dispatch(RECEIVED(GET_REQUIREMENTS_BY_PROJECT_ID, response));
                dispatch(updateFilterRequirementList(filter, comp, response.data))
            });

    }

}

export function deleteRequirementToProject(projectID, requirement){
    const post = {
        ...requirement,
        PID: projectID
    };
    return dispatch => {
        axios.post(URLS.PROJECT_REQUIREMENT_POST_DELETE, post)
            .then((response) => {
                dispatch(getRequirementsByProjectId(post.PID));
            })
            .catch((error) => {
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

export function deleteRequirementToProjectWithFilter(projectID, requirement, filter, comp){
    const post = {
        ...requirement,
        PID: projectID
    };
    return dispatch => {
        axios.post(URLS.PROJECT_REQUIREMENT_POST_DELETE, post)
            .then((response) => {
                dispatch(getRequirementsByProjectIdWithFilter(post.PID, filter, comp));
            })
            .catch((error) => {
                console.log(error);
            });
        dispatch(deleteRequirementToProjectAsync())
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
                dispatch(RECEIVED(POST_NEW_PROJECT, response));
                dispatch(snackBar(true, "Prosjekt laget!"));
            })
            .catch(function (error) {
                dispatch(ERROR(POST_NEW_PROJECT, error));
                dispatch(snackBar(true, "Noe gikk galt.."));
            });
        dispatch(SENT(POST_NEW_PROJECT));
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
