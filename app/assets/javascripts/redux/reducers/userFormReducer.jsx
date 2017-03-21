const userFormReducer = (state = {
    mode: "EMPTY",
}, action) => {
    switch (action.type) {
        case "CHANGE_USER_FORM_MODE":
            state = {
                mode: action.payload,
            };
            break;
    }
    return state;
};

export default userFormReducer;