import {
    TABLE_PAGE,
    TABLE_ROWS,
    TABLE_ADD
} from './../types.jsx';

const init = {
    page: 1,
    nRows: 10
};

const updateField = (state, object, field, data) => {
    if (state.tables[object]) {
        return {
            ...state,
            tables: { ...state.tables, [object]: {...state.tables[object], [field]: data}}
        }
    } else {
        return {
            ...state,
            tables: { ...state.tables, [object]: {...init, [field]: data}}
        }
    }
};

const tableReducer = (state = {
    tables: []
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
