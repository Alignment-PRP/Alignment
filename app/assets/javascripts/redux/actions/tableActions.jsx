import {
    PROJECT_TABLE_PAGE,
    PROJECT_TABLE_ROWS,
    USER_TABLE_PAGE,
    USER_TABLE_ROWS
} from './../types.jsx';

export function projectTablePage(page) {
    return {
        type: PROJECT_TABLE_PAGE,
        payload: page
    }
}

export function projectTableRows(nRows) {
    return {
        type: PROJECT_TABLE_ROWS,
        payload: nRows
    }
}

export function userTablePage(page) {
    return {
        type: USER_TABLE_PAGE,
        payload: page
    }
}

export function userTableRows(nRows) {
    return {
        type: USER_TABLE_ROWS,
        payload: nRows
    }
}
