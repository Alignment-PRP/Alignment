import {
    TABLE_PAGE,
    TABLE_ROWS
} from './../types.jsx';

const tableReducer = (state = {
    tables: []
}, action) => {
    if (!state.tables[action.table]) {
        state.tables[action.table] = {}
    }
    switch (action.type) {
        case TABLE_PAGE:
            state.tables[action.table].page = action.page;
            return {
                ...state
            };
        case TABLE_ROWS:
            state.tables[action.table].nRows = action.nRows;
            return {
                ...state
            };
        default:
            return state;
    }
};

export default tableReducer;
