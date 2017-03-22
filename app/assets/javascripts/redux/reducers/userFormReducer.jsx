const userFormReducer = (state = {
    mode: "EMPTY",
    index: 0,
}, action) => {
    switch (action.type) {
        case "CHANGE_USER_FORM_MODE":
            state = {
                mode: action.payload,
                index: state.index,
            };
            break;
        case "USER_CLICKED":
            state = {
                mode: state.mode,
                index: action.payload,
            };
            break;
    }
    return state;
};

export default userFormReducer;