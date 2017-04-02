import {
    PROJECTS_TABLE_PAGE,
    PROJECTS_TABLE_ROWS
} from './../types.jsx';

const projectTableReducer = (state = {
    page: 1,
    nRows: 10,
}, action) => {
    switch (action.type) {
        case PROJECTS_TABLE_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case PROJECTS_TABLE_ROWS:
            return {
                ...state,
                nRows: action.payload
            };
        default:
            return state;
    }
};

export default projectTableReducer;
