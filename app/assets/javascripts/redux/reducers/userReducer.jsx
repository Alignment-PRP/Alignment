const userReducer = (state = {
    userdata: [],
    users: []
}, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            state = {
                userdata: action.payload,
                users: state.users,
            };
            break;
        case "GET_USERS":
            state = {
                userdata: state.userdata,
                users: action.payload,
            };
            break;
    }
    return state;
};

export default userReducer;