import axios from 'axios';
import * as URLS from './../../config';
import {
    REQUIREMENT_SENT,
    UPDATE_REQUIREMENT,
    POST_UPDATE_REQUIREMENT,
    DELETE_REQUIREMENT,
    GET_ALL_CATEGORY_NAMES,
    GET_ALL_REQUIREMENTS,
    GET_REQ_STRUCTURE,
    REQUIREMENT_RECEIVED
} from './../types';
import {snackBar} from "./snackBarActions";

export function getAllRequirements() {
    return dispatch => {
        axios.get(URLS.REQUIREMENTS_GET)
            .then( response => {
                dispatch(getAllRequirementsAsync(response.data))
            });
    }
}

function getAllRequirementsAsync(data) {
    return {
        type: GET_ALL_REQUIREMENTS,
        payload: data
    }
}

export function getAllCategoryNames() {
    return dispatch => {
        axios.get(URLS.CATEGORY_GET_ALL_NAMES)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getAllCategoryNamesAsync(data))
            });

    }

}

function getAllCategoryNamesAsync(data) {
    return {
        type: GET_ALL_CATEGORY_NAMES,
        payload: data
    }
}

export function addRequirement(requirement) {
    console.log(requirement);
    return dispatch => {
        axios.post(URLS.REQUIREMENT_POST_ADD, requirement)
            .then(response => {
                dispatch(addRequirementReceivedAsync());
                dispatch(snackBar(true, 'Krav lagt til!'));
                dispatch(getAllRequirements());
            })
            .catch(error => {
                console.log(error);
            });
        dispatch(addRequirementAsync())
    }
}

function addRequirementAsync(){
    return {
        type: REQUIREMENT_SENT
    }
}

function addRequirementReceivedAsync() {
    return {
        type: REQUIREMENT_RECEIVED
    }
}

export function updateRequirement(requirement) {
    return {
        type: UPDATE_REQUIREMENT,
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
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    //TODO
                } else {
                    console.log(error);
                }
            });
        dispatch(deleteRequirementAsync())
    }
}

function deleteRequirementAsync(){
    return{
        type: DELETE_REQUIREMENT
    }
}

export function postUpdateRequirement(requirement){
    return dispatch => {
        axios.post(URLS.REQUIREMENT_POST_UPDATE, requirement)
            .then(function (response) {
                dispatch(getAllRequirements());
            })
            .catch(function (error) {
                console.log(error);
            });
        dispatch(postUpdateRequirementAsync())
    }
}

function postUpdateRequirementAsync(){
    return{
        type: POST_UPDATE_REQUIREMENT
    }
}
