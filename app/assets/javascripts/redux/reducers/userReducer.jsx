import { GET_USER_DATA, GET_USERS, GET_USERS_WITH_CLASS, GET_USERCLASSES } from './../types';

/**
 * Contains reducer for {@link redux/actions/user}.
 * @module redux/reducers/user
 */

const userReducer = (state = {
    userdata: null,
    users: null,
    userClasses: null,
}, action) => {
    switch (action.type) {
        case GET_USER_DATA.RECEIVED:
            return {
                ...state,
                userdata: action.response.data
            };
        case GET_USERS.RECEIVED:
            return {
                ...state,
                users: action.response.data
            };
        case GET_USERS_WITH_CLASS.RECEIVED:
            return {
                ...state,
                users: action.response.data
            };
        case GET_USERCLASSES.RECEIVED:
            return {
                ...state,
                userClasses: action.response.data
            };
        default:
            return state
    }
};

export default userReducer;