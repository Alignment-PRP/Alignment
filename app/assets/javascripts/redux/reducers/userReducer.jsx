import {GET_USER_DATA, GET_USERS, GET_USERS_WITH_CLASS, GET_USERCLASSES} from './../types.jsx';

/**
 * Contains reducer for {@link redux/actions/user}.
 * @module redux/reducers/user
 */

const userReducer = (state = {
    userdata: null,
    users: [],
    userclasses: [],
}, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            state = {
                userdata: action.payload,
                users: state.users,
                userclasses: state.userclasses,
            };
            break;
        case GET_USERS:
            state = {
                userdata: state.userdata,
                users: action.payload,
                userclasses: state.userclasses,
            };
            break;
        case GET_USERS_WITH_CLASS:
            state = {
                userdata: state.userdata,
                users: action.payload,
                userclasses: state.userclasses,
            };
            break;
        case GET_USERCLASSES:
            state = {
                userdata: state.userdata,
                users: state.users,
                userclasses: action.payload,
            };
            break;
    }
    return state;
};

export default userReducer;