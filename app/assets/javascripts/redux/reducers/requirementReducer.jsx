import axios from 'axios';

const getInitialState = () => {
    const data = [];

    axios.get('http://localhost:9000/requirements/all ')
        .then( response => {
            response.data.map((object) => {
                data.push(object)
            });
        });

    return {
        requirements: data
    }

};


const requirementReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case "GET_ALL_REQUIREMENTS":
            state = {
                requirements: action.payload
            };
            break;
    }
    return state;
};

export default requirementReducer;