import {
    TABLE_PAGE,
    TABLE_ROWS
} from './../types.jsx';

export function tablePage(table, page) {
    return {
        type: TABLE_PAGE,
        table: table,
        page: page
    }
}

export function tableRows(table, nRows) {
    return {
        type: TABLE_ROWS,
        table: table,
        nRows: nRows
    }
}
