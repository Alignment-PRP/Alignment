import {
    PROJECT_TABLE_PAGE,
    PROJECT_TABLE_ROWS,
    USER_TABLE_PAGE,
    USER_TABLE_ROWS
} from './../types.jsx';

const data = {
    page: 1,
    nRows: 10
};

const tableReducer = (state = {
    project: {...data},
    user: {...data},
}, action) => {
    switch (action.type) {
        case PROJECT_TABLE_PAGE:
            return {
                ...state,
                project: {
                    ...state.project,
                    page: action.payload
                }
            };
        case PROJECT_TABLE_ROWS:
            return {
                ...state,
                project: {
                    ...state.project,
                    nRows: action.payload
                }
            };
        case USER_TABLE_PAGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    page: action.payload
                }
            };
        case USER_TABLE_ROWS:
            return {
                ...state,
                user: {
                    ...state.user,
                    nRows: action.payload
                }
            };
        default:
            return state;
    }
};

export default tableReducer;
