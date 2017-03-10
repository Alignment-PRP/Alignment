const userReducer = (state = {
    name: "Glenn Aarøen",
    age: 27
}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                name: action.payload,
                age: state.age
            };
            break;
        case "SET_AGE":
            state = {
                name: state.name,
                age: action.payload
            };
            break;
    }
    return state;
};

export default userReducer;