import {
    TABLE_PAGE,
    TABLE_ROWS,
    TABLE_SEARCH_DATA
} from './../types';

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

export function tableSearchData(object, data) {
    return {
        type: TABLE_SEARCH_DATA,
        object: object,
        data: data
    }
}

