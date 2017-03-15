import axios from 'axios';

export function getAllProjects() {
    return dispatch => {
        axios.get('http://localhost:9000/projects')
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

function getAllProjectsAsync(data) {
    return {
        type: "GET_ALL_PROJECTS",
        payload: data
    }
}


export function getProjectById(id) {
    return dispatch => {
        axios.get('http://localhost:9000/project/id/' + id)
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
        type: "GET_PROJECT_BY_ID",
        payload: data
    }
}

export function getRequirementsByProjectId(id) {
    return dispatch => {
        axios.get('http://localhost:9000/all-projectrequirements?id=' + id)
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
        type: "GET_REQUIREMENTS_BY_PROJECT_ID",
        payload: data
    }
}
