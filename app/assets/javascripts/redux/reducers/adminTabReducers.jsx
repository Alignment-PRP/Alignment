const adminTabReducer = (state = {
    index: 0,
}, action) => {
    switch (action.type) {
        case "ADMIN_TAB_CHANGE":
            return {
                ...state,
                index: action.payload
            }
    }
    return state;
};

export default adminTabReducer;