import axios from 'axios';
import * as URLS from './../../config';
import { GET_PROJECTS_PER_REQUIREMENT } from './../types';

export function getRequirementUsageStatistics() {
    return dispatch => {
        axios.get(URLS.REQUIREMENTS_GET_STATISTICS)
            .then( response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getStatisticsAsync(data))
            });

    }

}

function getStatisticsAsync(data){
    return {
        type: GET_PROJECTS_PER_REQUIREMENT,
        payload: data
    }
}