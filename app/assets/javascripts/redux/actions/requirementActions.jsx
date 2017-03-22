import axios from 'axios';
import * as URLS from './../../config.jsx';
import {GET_ALL_REQUIREMENTS,
        UPDATE_FILTER_REQUIREMENT_LIST,
        UPDATE_FILTER,
        UPDATE_REQUIREMENT
} from './../types.jsx';

export function getAllRequirements() {
    return dispatch => {
        axios.get(URLS.REQUIREMENTS_GET)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getAllRequirementsAsync(data))
            });

    }

}

function getAllRequirementsAsync(data) {
    return {
        type: GET_ALL_REQUIREMENTS,
        payload: data
    }
}

export function updateFilterRequirementList(newFilterRequirementList) {
    return {
        type: UPDATE_FILTER_REQUIREMENT_LIST,
        payload: newFilterRequirementList
    }
}

export function updateFilter(newFilter) {
    return {
        type: UPDATE_FILTER,
        payload: newFilter
    }
}

export function updateRequirement(requirement) {
    return {
        type: UPDATE_REQUIREMENT,
        payload: requirement
    }
}
