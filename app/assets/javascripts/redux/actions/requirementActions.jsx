import axios from 'axios';

export function getAllRequirements() {

    const data = [];

    axios.get('http://localhost:9000/requirements/all ')
        .then( response => {
                response.data.map((object) => {
                    data.push(object)
                });
            });

    return {
        type: "GET_ALL_REQUIREMENTS",
        payload: data
    }
}

