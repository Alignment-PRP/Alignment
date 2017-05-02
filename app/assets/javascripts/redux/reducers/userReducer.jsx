import { GET_USER_DATA, GET_USERS, GET_USERS_WITH_CLASS, GET_USERCLASSES } from './../types';

/**
 * Contains reducer for {@link redux/actions/user}.
 * @module redux/reducers/user
 */

const userReducer = (state = {
    userdata: null,
    users: null,
    userClasses: [],
}, action) => {
    switch (action.type) {
        case GET_USER_DATA.RECEIVED:
            return {
                ...state,
                userdata: action.response.data
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case GET_USERS_WITH_CLASS:
            return {
                ...state,
                users: action.payload
            };
        case GET_USERCLASSES:
            return {
                ...state,
                userClasses: action.payload
            };
        default:
            return state
    }
};

export default userReducer;