import axios from 'axios';
import { SENT, RECEIVED, ERROR } from './../utility';
import * as URLS from './../../config';
import {snackBar} from "./snackBarActions";
import {
    ADD_REQUIREMENT,
    POST_UPDATE_REQUIREMENT,

    FORM_UPDATE_REQUIREMENT,
    FORM_UPDATE_REQUIREMENT_METADATA,
    GET_CATEGORY_NAMES,
    GET_REQUIREMENTS,
    POST_ADD_REQUIREMENT,
    POST_DELETE_REQUIREMENT,
    POST_UPDATE_PROJECT_REQUIREMENT,
    POST_UPDATE_PROJECT_REQUIREMENT_METADATA
} from './../types';
import { getRequirementsByProjectIdWithFilter } from './projectActions';

export function getAllRequirements() {
    return dispatch => {
        axios.get(URLS.REQUIREMENTS_GET)
            .then( response => {
                dispatch(RECEIVED(GET_REQUIREMENTS, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_REQUIREMENTS, error));
            });
        dispatch(SENT(GET_REQUIREMENTS));
    }
}

export function getAllCategoryNames() {
    return dispatch => {
        axios.get(URLS.CATEGORY_GET_ALL_NAMES)
            .then( response => {
                dispatch(RECEIVED(GET_CATEGORY_NAMES, response));
            })
            .catch(error => {
                dispatch(ERROR(GET_CATEGORY_NAMES, error));
            });
        dispatch(SENT(GET_CATEGORY_NAMES));
    }

}

export function addRequirement(requirement) {
    console.log(requirement);
    return dispatch => {
        axios.post(URLS.REQUIREMENT_POST_ADD, requirement)
            .then(function (response) {
                dispatch(RECEIVED(POST_ADD_REQUIREMENT, response));
            })
            .catch(function (error) {
                dispatch(ERROR(POST_ADD_REQUIREMENT, error));
            });
        dispatch(SENT(POST_ADD_REQUIREMENT));
    }
}

export function updateRequirement(requirement) {
    return {
        type: FORM_UPDATE_REQUIREMENT,
        payload: requirement
    }
}

export function deleteRequirement(requirement){

    //Create JSON
    const post = {
        RID: requirement.RID
    };

    return dispatch => {
        axios.post(URLS.REQUIREMENT_POST_DELETE, post)
            .then(function (response) {
                dispatch(getAllRequirements());
                dispatch(RECEIVED(POST_DELETE_REQUIREMENT, response));
            })
            .catch(function (error) {
                dispatch(ERROR(POST_DELETE_REQUIREMENT, error));
            });
        dispatch(SENT(POST_DELETE_REQUIREMENT))
    }
}

export function postUpdateRequirement(requirement){

    return dispatch => {
        console.log(requirement);
        axios.post(URLS.REQUIREMENT_POST_UPDATE, requirement)
            .then(function (response) {
                dispatch(RECEIVED(POST_UPDATE_REQUIREMENT, response))
            })
            .catch(function (error) {
                dispatch(ERROR(POST_UPDATE_REQUIREMENT, error));
            });
        dispatch(SENT(POST_UPDATE_REQUIREMENT));
    }
}


export function postUpdateRequirementMetadata(requirement){
    return dispatch => {
        axios.post(URLS.REQUIREMENT_POST_UPDATE, requirement)
            .then(function (response) {
                dispatch(getAllRequirements());
                dispatch(RECEIVED(POST_UPDATE_PROJECT_REQUIREMENT_METADATA, response));
            })
            .catch(function (error) {
                dispatch(ERROR(POST_UPDATE_PROJECT_REQUIREMENT_METADATA, error));
            });
        dispatch(SENT(POST_UPDATE_PROJECT_REQUIREMENT_METADATA));
    }
}

export function postProjectReqUpdate(requirement){
    return dispatch => {
        console.log(requirement);
        axios.post(URLS.PROJECT_REQUIREMENT_POST_UPDATE, requirement)
            .then(function (response) {
                dispatch(getAllRequirements());
                dispatch(RECEIVED(POST_UPDATE_PROJECT_REQUIREMENT, response));
                dispatch(getRequirementsByProjectIdWithFilter(requirement.PID, 'project', 'projectRequirements'));
            })
            .catch(function (error) {
                dispatch(ERROR(POST_UPDATE_PROJECT_REQUIREMENT, error));
            });
        dispatch(SENT(POST_UPDATE_PROJECT_REQUIREMENT));
    }
}

export function updateRequirementMetadata(requirement) {

    const requirementMetadata = {
        PID: requirement.PID,
        RID: requirement.RID,
        comment: requirement.comment,
        description: requirement.description,
        reqCode: requirement.reqCode,
        reqNo: requirement.reqNo
    }

    return {
        type: FORM_UPDATE_REQUIREMENT_METADATA,
        payload: requirementMetadata
    }
}
