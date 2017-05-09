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
import axios from 'axios';
import * as URLS from './../../config';

import { SENT, RECEIVED, ERROR } from './../utility';
import {
    INIT_EDIT_PROJECT_FORM,
    CLEAR_INIT_EDIT_PROJECT_FORM,
    GET_PROJECT_DATA_BY_ID,
    GET_PROJECT_META_BY_ID,
    GET_PROJECTS_PUBLIC,
    GET_PROJECTS_ACCESSIBLE,
    GET_PROJECTS_IS_CREATOR,
    GET_PROJECTS_IS_MANAGER,
    POST_NEW_PROJECT,
    POST_UPDATE_PROJECT,
    POST_DELETE_PROJECT,
    GET_PROJECT_BY_ID,
    GET_REQUIREMENTS_BY_PROJECT_ID,
    POST_REQUIREMENT_TO_PROJECT,
    DELETE_REQUIREMENT_TO_PROJECT,
    CHANGE_PROJECTS_TABLE_MODE,

    GET_USERS_THAT_HAVE_ACCESS,
    GET_CLASSES_THAT_HAVE_ACCESS,
    REMOVE_HAS_ACCESS,
    INSERT_HAS_ACCESS
} from './../types';
import {
    snackBar
} from './snackBarActions';

import { updateFilterRequirementList } from './filterActions';
import { postProjectReqUpdate } from "./requirementActions";

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

export function getUsersThatHaveAccess(id) {
    return dispatch => {
        axios.get(URLS.GET_USERS_THAT_HAVE_ACCESS.replace(':id', id))
            .then( response => {
                dispatch(RECEIVED(GET_USERS_THAT_HAVE_ACCESS, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_USERS_THAT_HAVE_ACCESS, error));
            });
        dispatch(SENT(GET_USERS_THAT_HAVE_ACCESS));
    }
}

export function getClassesThatHaveAccess(id) {
    return dispatch => {
        axios.get(URLS.GET_CLASSES_THAT_HAVE_ACCESS.replace(':id', id))
            .then( response => {
                dispatch(RECEIVED(GET_CLASSES_THAT_HAVE_ACCESS, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_CLASSES_THAT_HAVE_ACCESS, error));
            });
        dispatch(SENT(GET_CLASSES_THAT_HAVE_ACCESS));
    }
}

export function getProjectDataById(id) {
    return dispatch => {
        axios.get(URLS.PROJECT_GET_DATA_BY_ID.replace(':id', id))
            .then( response => {
                dispatch(RECEIVED(GET_PROJECT_DATA_BY_ID, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_PROJECT_DATA_BY_ID, error));
            });
        dispatch(SENT(GET_PROJECT_DATA_BY_ID));
    }
}

export function getProjectMetaDataById(id) {
    return dispatch => {
        axios.get(URLS.PROJECT_GET_META_BY_ID.replace(':id', id))
            .then( response => {
                dispatch(RECEIVED(GET_PROJECT_META_BY_ID, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_PROJECT_META_BY_ID, error));
            });
        dispatch(SENT(GET_PROJECT_META_BY_ID));
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
                dispatch(getRequirementsByProjectId(post.PID));
            })
            .catch(function (error) {
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

export function editAndAddRequirementToProject(id, requirement, filter, comp){

    const post = {
        ...requirement,
        PID: id
    };

    //postRequirementToProjectWithFilter(id, requirement, 'project', 'projectRequirements');
    if (filter && Object.keys(filter).length > 0) {
        return dispatch => {
            axios.post(URLS.PROJECT_REQUIREMENT_POST_ADD, post)
                .then((response) => {
                    //postProjectReqUpdate(data)
                    dispatch(postProjectReqUpdate(post));
                })
                .catch((error) => {
                });
            dispatch(postRequirementToProjectAsync())
        }

    } else {
        //postRequirementToProject(id, requirement);
        return dispatch => {
            axios.post(URLS.PROJECT_REQUIREMENT_POST_ADD, post)
                .then(function (response) {
                   dispatch(postProjectReqUpdate(post));
                })
                .catch(function (error) {
                });
            dispatch(postRequirementToProjectAsync())
        }
        //postProjectReqUpdate(data)
    }

}

export function removeHasAccess(projectID, data){
    const post = {
        ...data,
        PID: projectID
    };
    return dispatch => {
        axios.post(URLS.REMOVE_HAS_ACCESS, post)
            .then((response) => {
                dispatch(RECEIVED(REMOVE_HAS_ACCESS, response));
                dispatch(getUsersThatHaveAccess(post.PID));
                dispatch(getClassesThatHaveAccess(post.PID));
            })
            .catch((error) => {
                dispatch(ERROR(REMOVE_HAS_ACCESS, error));
            });
        dispatch(SENT(REMOVE_HAS_ACCESS));
    }
}

export function insertHasAccess(projectID, data){
    const post = {
        ...data,
        PID: projectID
    };
    return dispatch => {
        axios.post(URLS.INSERT_HAS_ACCESS, post)
            .then((response) => {
                dispatch(RECEIVED(INSERT_HAS_ACCESS, response));
                dispatch(getUsersThatHaveAccess(post.PID));
                dispatch(getClassesThatHaveAccess(post.PID));
            })
            .catch((error) => {
                dispatch(ERROR(INSERT_HAS_ACCESS, error));
            });
        dispatch(SENT(INSERT_HAS_ACCESS));
    }
}

function removeHasAccessAsync() {
    return {
        type: REMOVE_HAS_ACCESS
    }
}

function insertHasAccessAsync() {
    return {
        type: INSERT_HAS_ACCESS
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

export function postProjectUpdate(project) {
    return dispatch => {
        axios.post(URLS.PROJECT_POST_UPDATE, project)
            .then(response => {
                dispatch(getProjectDataById(project.ID));
                dispatch(getProjectMetaDataById(project.ID));
                dispatch(RECEIVED(POST_UPDATE_PROJECT, response));
                dispatch(snackBar(true, "Prosjektet ble oppdatert!"));
            })
            .catch(error => {
                dispatch(ERROR(POST_UPDATE_PROJECT, error));
                dispatch(snackBar(true, "Noe gikk galt.."));
            });
        dispatch(SENT(POST_UPDATE_PROJECT));
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
        PID: project.ID
    };

    return dispatch => {
        axios.post(URLS.PROJECT_DELETE_BY_ID, post)
            .then(function (response) {
                dispatch(snackBar(true, "Prosjeket ble slettet!"));
                dispatch(getProjectsPublic());
                dispatch(getProjectsAccessible());
                dispatch(getProjectsIsCreator());
                dispatch(getProjectsIsManager());
            })
            .catch(function (error) {
                dispatch(snackBar(true, "Noe gikk galt.."));
            });
        dispatch(deleteProjectAsync())
    }
}

function deleteProjectAsync(){
    return{
        type: POST_DELETE_PROJECT
    }
}

export function initEditProjectForm(projectData, projectMeta){

    const data = {
        ...projectData,
        ...projectMeta,
        isPublic: projectData.isPublic === '1'
    };

    return {
        type: INIT_EDIT_PROJECT_FORM,
        payload: data
    }


}

export function clearInitEditProjectForm(){
    return {
        type: CLEAR_INIT_EDIT_PROJECT_FORM,
        payload: null
    }
}
