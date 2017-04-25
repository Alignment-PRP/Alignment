import {
    TABLE_PAGE,
    TABLE_ROWS,
    TABLE_SEARCH_DATA,
    TABLE_SEARCH_VALUE
} from './../types';

const init = {
    page: 1,
    nRows: 10,
    searchData: null,
    searchText: null
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
        case TABLE_SEARCH_DATA:
            return updateField(state, action.object, 'searchData', action.data);
        case TABLE_SEARCH_VALUE:
            return updateField(state, action.object, 'searchText', action.data);
        default:
            return state;
    }
};

export default tableReducer;
