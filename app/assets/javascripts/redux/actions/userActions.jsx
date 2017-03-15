import axios from 'axios';

export function getUserData() {
    return dispatch => {
        axios.get('http://localhost:9000/usernameAndClass')
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
