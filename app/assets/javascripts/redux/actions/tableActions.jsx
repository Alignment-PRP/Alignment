import {
    TABLE_PAGE,
    TABLE_ROWS
} from './../types.jsx';

export function tablePage(object, page) {
    return {
        type: TABLE_PAGE,
        object: object,
        page: page
    }
}

export function tableRows(object, nRows) {
    return {
        type: TABLE_ROWS,
        object: object,
        nRows: nRows
    }
}
