const requirementReducer = (state = {
    requirements: []
}, action) => {
    switch (action.type) {
        case "GET_REQUIREMENTS":
            state = {
                requirements: [state.requirements.push(action.payload)]
            };
            break;
        case "SUBTRACT":
            state = {
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
    }
    return state;
};

export default requirementReducer;