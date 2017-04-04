import {GET_PROJECTS_PER_REQUIREMENT
} from './../types.jsx';
//Here is where the global state of the projectReducer actually get stored and changed. The projectReducer get passed actions.types into a switch function.
//When updating, all other fields in the state needs to stay the same. The field that gets updated gets the action.payload data from redux actions.
//Check project.jsx comment to see how to use the this project states and redux actions.
//all reducers get gathered into one big reducer in store.jsx

const projectReducer = (state = {
    projectsPerRequirement: []
}, action) => {
    switch (action.type) {
        case GET_PROJECTS_PER_REQUIREMENT:
            state = {
                ...state,
                projectsPerRequirement: action.payload
            };
            break;

    }
    return state;
};

export default projectReducer;