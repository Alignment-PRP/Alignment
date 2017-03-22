import {GET_ALL_REQUIREMENTS,
        UPDATE_FILTER_REQUIREMENT_LIST,
        UPDATE_FILTER,
        UPDATE_REQUIREMENT
} from './../types.jsx';

const requirementReducer = (state = {
    requirements: [],
    requirement: [],
    filterRequirementList: [],
    filter: []
}, action) => {
    switch (action.type) {
        case GET_ALL_REQUIREMENTS:
            state = {
                requirements: action.payload,
                requirement: state.requirement,
                filterRequirementList: state.filterRequirementList,
                filter: state.filter
            };
            break;
        case UPDATE_REQUIREMENT:
            state = {
                requirements: state.requirements,
                requirement: action.payload,
                filterRequirementList: state.filterRequirementList,
                filter: state.filter
            };
        case UPDATE_FILTER_REQUIREMENT_LIST:
            state = {
                requirements: state.requirements,
                requirement: state.requirement,
                filterRequirementList: action.payload,
                filter: state.filter
            };
            break;
        case UPDATE_FILTER:
            state = {
                requirements: state.requirements,
                requirement: state.requirement,
                filterRequirementList: state.filterRequirementList,
                filter: action.payload
            };
            break;
    }
    return state;
};

export default requirementReducer;