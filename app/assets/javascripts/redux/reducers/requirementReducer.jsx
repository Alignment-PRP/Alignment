const requirementReducer = (state = {
    requirements: [],
    filterRequirementList: [],
    filter: []
}, action) => {
    switch (action.type) {
        case "GET_ALL_REQUIREMENTS":
            state = {
                requirements: action.payload,
                filterRequirementList: state.filterRequirementList,
                filter: state.filter
            };
            break;
        case "UPDATE_FILTER_REQUIREMENT_LIST":
            state = {
                requirements: state.requirements,
                filterRequirementList: action.payload,
                filter: state.filter
            };
            break;
        case "UPDATE_FILTER":
            state = {
                requirements: state.requirements,
                filterRequirementList: state.filterRequirementList,
                filter: action.payload
            };
            break;
    }
    return state;
};

export default requirementReducer;