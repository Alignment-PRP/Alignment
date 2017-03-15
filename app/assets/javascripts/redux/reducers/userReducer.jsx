const userReducer = (state = {
    userdata: [],
}, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            state = {
                userdata: action.payload,
            };
            break;
    }
    return state;
};

export default userReducer;