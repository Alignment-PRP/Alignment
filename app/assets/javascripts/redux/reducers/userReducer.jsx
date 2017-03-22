import {GET_USER_DATA} from './../types.jsx';

const userReducer = (state = {
    userdata: [],
}, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            state = {
                userdata: action.payload,
            };
            break;
    }
    return state;
};

export default userReducer;