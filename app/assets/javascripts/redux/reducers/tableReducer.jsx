import {
    TABLE_PAGE,
    TABLE_ROWS
} from './../types.jsx';

const init = {
    page: 1,
    nRows: 10
};

const updateField = (state, object, field, data) => {
    let newState = {...state};
    newState[object][field] = data;
    return newState;
};

const tableReducer = (state = {
    project: {...init},
    user: {...init},
    userClass: {...init},
    requirement: {...init}
}, action) => {
    switch (action.type) {
        case TABLE_PAGE:
            return updateField(state, action.object, 'page', action.page);
        case TABLE_ROWS:
            return updateField(state, action.object, 'nRows', action.nRows);
        default:
            return state;
    }
};

export default tableReducer;
