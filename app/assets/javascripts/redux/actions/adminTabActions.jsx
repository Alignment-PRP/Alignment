/**
 * Contains action creators for {@link Admin}
 * @module redux/actions/adminTab
 */

/**
 * @param {int} index Index of tab to change to.
 * @returns {{type: string, payload: *}}
 */
export function changeTab(index) {
    return {
        type: 'ADMIN_TAB_CHANGE',
        payload: index
    }
}
