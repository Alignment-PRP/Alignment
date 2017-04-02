import {
    PROJECTS_TABLE_PAGE,
    PROJECTS_TABLE_ROWS
} from './../types.jsx';

/**
 * Contains action creators for {@link ProjectTable}
 * @module redux/actions/projectTable
 */

export function projectTablePage(page) {
    return {
        type: PROJECTS_TABLE_PAGE,
        payload: page
    }
}

export function projectTableRows(nRows) {
    return {
        type: PROJECTS_TABLE_ROWS,
        payload: nRows
    }
}
