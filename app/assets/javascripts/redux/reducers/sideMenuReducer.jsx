const sideMenuReducer = (state = {
    mode: "",
}, action) => {
    switch (action.type) {
        case "CHANGE_SIDE_MENU_MODE":
            state = {
                mode: action.payload,
            };
            break;
    }
    return state;
};

export default sideMenuReducer;