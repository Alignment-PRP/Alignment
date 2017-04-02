import {GET_ALL_REQUIREMENTS,
        GET_ALL_CATEGORY_NAMES,
        UPDATE_FILTER_REQUIREMENT_LIST,
        UPDATE_FILTER,
        UPDATE_REQUIREMENT,
        DELETE_REQUIREMENT
} from './../types.jsx';

const requirementReducer = (state = {
    requirements: [],
    requirement: [],
    filterRequirementList: [],
    filter: [],
    categoryNames: []
}, action) => {
    switch (action.type) {
        case GET_ALL_REQUIREMENTS:
            state = {
                requirements: action.payload,
                requirement: state.requirement,
                filterRequirementList: state.filterRequirementList,
                filter: state.filter,
                categoryNames: state.categoryNames
            };
            break;
        case GET_ALL_CATEGORY_NAMES:
            state = {
                requirements: state.requirements,
                requirement: state.requirement,
                filterRequirementList: state.filterRequirementList,
                filter: state.filter,
                categoryNames: action.payload
            };
            break;
        case UPDATE_REQUIREMENT:
            state = {
                requirements: state.requirements,
                requirement: action.payload,
                filterRequirementList: state.filterRequirementList,
                filter: state.filter,
                categoryNames: state.categoryNames
            };
        case UPDATE_FILTER_REQUIREMENT_LIST:
            state = {
                requirements: state.requirements,
                requirement: state.requirement,
                filterRequirementList: action.payload,
                filter: state.filter,
                categoryNames: state.categoryNames
            };
            break;
        case UPDATE_FILTER:
            state = {
                requirements: state.requirements,
                requirement: state.requirement,
                filterRequirementList: state.filterRequirementList,
                filter: action.payload,
                categoryNames: state.categoryNames
            };
            break;
        case DELETE_REQUIREMENT:
            break;
    }
    return state;
};

export default requirementReducer;