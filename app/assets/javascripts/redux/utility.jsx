/**
 * Contains utility functions for redux
 * @module redux/utility
 */

/**
 * @function
 * @param {ActionType} type
 * @returns {{type: (string|*|String)}}
 */
export const SENT = (type) => {return {type: type.SENT}};

/**
 * @function
 * @param {ActionType} type
 * @param {Object} response
 * @returns {{type: (string|*|String), response: *}}
 */
export const RECEIVED = (type, response) => {return {type: type.RECEIVED, response: response}};

/**
 * @function
 * @param {ActionType} type
 * @param {Object} error
 * @returns {{type: (string|*|string|exports.LEVELS|number|String|Event), error: *}}
 */
export const ERROR = (type, error) => {return {type: type.ERROR, error: error}};

/**
 * @function
 * @param {String} type
 * @returns {ActionType}
 */
export const type = (type) => {
    return {
        SENT: type + '_SENT',
        RECEIVED: type + '_RECEIVED',
        ERROR: type + '_ERROR'
    }
};

export const getType = (type) => {
    return {

    }
};
