import axios from 'axios';
import * as URLS from './../../config.jsx';

export function getUserData() {
    return dispatch => {
        axios.get(URLS.USERNAME_AND_CLASS)
            .then(response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                    return data
                });
                dispatch(getUserDataAsync(data))
            });
    }
}

function getUserDataAsync(data) {
    return {
        type: "GET_USER_DATA",
        payload: data
    }
}
