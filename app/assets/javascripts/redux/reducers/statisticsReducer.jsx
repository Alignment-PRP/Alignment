import { GET_PROJECTS_PER_REQUIREMENT } from './../types.jsx';

const statisticsReducer = (state = {
    projectsPerRequirement: []
}, action) => {
    switch (action.type) {
        case GET_PROJECTS_PER_REQUIREMENT:
            return {
                ...state,
                projectsPerRequirement: action.payload
            };
        default:
            return state
    }
};

export default statisticsReducer;