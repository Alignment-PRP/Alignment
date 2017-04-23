
/**
 * Representation of a project.
 * @global
 * @typedef {Object} Project
 * @property {string} name - Project name
 * @property {string} securityLevel
 * @property {string} transactionVolume
 * @property {string} userChannel
 * @property {string} deploymentStyle
 * @property {boolean} isPublic
 */

/**
 * Representation of a userclass.
 * @global
 * @typedef {Object} UserClass
 * @property {string} NAME - Userclass name. Is unique.
 * @property {string} description - Describes the userclass.
 */

/**
 * Representation of a user.
 * @global
 * @typedef {Object} User
 * @property {string} USERNAME - Username. Is unique.
 * @property {string} firstName - The user's firstname.
 * @property {string} lastName - The user's lastname.
 * @property {string} email - The user's email address.
 * @property {string} ucName - The userclass the user is a member of.
 */

/**
 * @global
 * @typedef {Object} Snack
 * @property {boolean} isOpen
 * @property {string} text
 */

/**
 * Configuration object for {@link DataTable}
 * @global
 * @typedef {Object} DataTableConfig
 * @property {String} table - Table name, should be unique.
 * @property {Array.<Object>} data - The data used to populate the table.
 * @property {Array.<Column>} columns - Maps the data between headers, rows and columns.
 * @property {Toolbar} toolbar - If not null, creates a toolbar above the table header.
 */

/**
 * Object for rendering a toolbar for {@link DataTable}.
 * @global
 * @typedef {Object} Toolbar
 * @property {String} title - Title text for the toolbar.
 * @property {String} search - If specified, search functionality is turned on. Provided string is the properties which is used in the filtering process. Properties can be seperated with `|`. `ucName|USERNAME`.
 * @property {Function} render - Method for rendering components inside the toolbar. Could be a ToolbarGroup with buttons and text.
 */

/**
 * Column configuration object for {@link DataTable}
 * @global
 * @typedef {Object} Column
 * @property {String} label - Header text
 * @property {String} property - Determines the property in the data object to populate the column.
 * @property {Wrap} wrap - Determines if the text should wrap or not.
 * @property {String} width - Column width
 * @property {String} type - Used for some predefined rendering methods. See {@link DataTable}.
 * @property {Function} action - Called when the column is clicked. See {@link DataTable}.
 * @property {String} link - See {@link DataTable}.
 * @property {String} linkField - See {@link DataTable}.
 */

/**
 * Wrap configuration object for {@link Column}
 * @global
 * @typedef {Object} Wrap
 * @property {Number} lines - Determines the maximum number of lines before overflow is hidden.|
 * @property {Function} ellipsis - Renderer for ellipsis. Passes the data object.
 */
