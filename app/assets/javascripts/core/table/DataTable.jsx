import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { tablePage, tableRows, tableSearchData, tableSearchValue } from './../../redux/actions/tableActions';
import DataTableHeaderRows from './DataTableHeaderRows';
import DataTableRow from './DataTableRow';
import DataTableToolbar from "./DataTableToolbar";

/**
 * Reusable Table component. Renders accordingly to the passed configuration object.
 *
 * ## Configuration options
 *
 * | Attribute | Type | Required | Default | Description |
 * |-----------|------|----------|---------|-------------|
 * |table|string|Yes|null|Table name, should be unique.|
 * |data|Array|Yes|null|The data used to populate the table.|
 * |columns|Array|Yes|null|Maps the data between headers, rows and columns.|
 * |toolbar|Object|No|null|If not null, creates a toolbar above the table header.|
 *
 * ## Columns configuration
 *
 * ### Standard column
 * | Attribute | Type | Required | Default | Description |
 * |-----------|------|----------|---------|-------------|
 * |label|String|Yes|null|Header text|
 * |property|String|Yes|null|Determines the property in the data object to populate the column.|
 * |wrap|Object|no|false|Determines if the text should wrap or not.|
 * |width|String|Yes|null|Column width|
 *
 * #### Wrap configuration
 * | Attribute | Type | Required | Default | Description |
 * |-----------|------|----------|---------|-------------|
 * |lines|int|No|4|Determines the maximum number of lines before overflow is hidden.|
 * |ellipsis|Function|No|null|Renderer for ellipsis. Passes the data object.|
 *
 * ### Action column
 * | Attribute | Type | Required | Default | Description |
 * |-----------|------|----------|---------|-------------|
 * |type|String|Yes|null|Determines rendering method based on predefined types. Valid types are: `EDIT_ACTION`, `DELETE_ACTION` and `ADD_ACTION`.|
 * |action|Function|No|null|Called when the column is clicked. Data object in the row is passed as parameter.|
 * |width|String|Yes|null|Column width.|
 *
 * ### Link column
 * | Attribute | Type | Required | Default | Description |
 * |-----------|------|----------|---------|-------------|
 * |type|String|Yes|null|Determines rendering method based on predefined types. Valid types are: `LINK`, `EDIT_LINK` and `DELETE_LINK`.|
 * |label|String|No|null|Label.|
 * |link|String|Yes|null|Link url.|
 * |linkField|String|No|null|If defined, the value from the attribute on the data object is added to the link.|
 * |width|String|Yes|null|Column width.|
 *
 * ## Toolbar configuration
 *
 * | Attribute | Type | Required | Default | Description |
 * |-----------|------|----------|---------|-------------|
 * |title|String|Yes|null|Title text for the toolbar.|
 * |search|String|No|null|If specified, search functionality is turned on. Provided string is the properties which is used in the filtering process. Properties can be seperated with `|`. `ucName|USERNAME`.
 * |render|Function|No|null|Method for rendering components inside the toolbar. Could be a ToolbarGroup with buttons and text.|
 *
 * @example
 * import React from 'react';
 * import DataTable from './DataTable.jsx';
 *
 *
 * class ExampleTable extends React.Component {
 *
 *   render() {
 *
 *       const metaData = {
 *           table: 'example',
 *           data: [
 *               {name: 'Bjarne', jobb: 'Lege'},
 *               {name: 'Idun', jobb: 'Lærer'},
 *               {name: 'Lise', jobb: 'Ingeniør'},
 *               {name: 'Arne', jobb: 'Vaktmester'}
 *           ],
 *           columns: [
 *               {label: 'Navn', field: 'name', width: '30%'},
 *               {label: 'Jobb', field: 'jobb', width: '30%'},
 *               {type: 'ADD_ACTION', action: (obj) => console.log(obj), width: '20%'},
 *               {type: 'LINK', label: 'Kaker', link: 'cakes', width: '20%'}
 *           ]
 *           toolbar: {
 *               title: 'Brukere',
 *               render: () => {
 *                   return (
 *                       <ToolbarGroup>
 *                           <ToolbarSeparator />
 *                           <RaisedButton label="Ny Bruker" primary={true} onTouchTap={() => console.log("ny bruker...") } />
 *                           <IconMenu
 *                               iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
 *                               anchorOrigin={{horizontal: 'right', vertical: 'top'}}
 *                               targetOrigin={{horizontal: 'right', vertical: 'top'}}
 *                           >
 *                               <MenuItem primaryText="Oppdater" />
 *                               <MenuItem primaryText="Settings" />
 *                           </IconMenu>
 *                       </ToolbarGroup>
 *                   );
 *               }
 *           }
 *       };
 *
 *       return (
 *           <DataTable metaData={metaData}/>
 *       );
 *   }
 *
 * }
 *
 * export default ExampleTable;
 */
class DataTable extends React.Component {

    constructor(props) {
        super(props);

        this.renderToolbar = this.renderToolbar.bind(this);
        this.searchData = this.searchData.bind(this);
        this.getData = this.getData.bind(this);
    }

    /**
     * Renders the body.
     * @param {Array.<Column>} columns - Array with {@link Column}.
     * @param {Array.<Object>} datac - Data used to populate the table.
     * @param {number} nRows - Number of rows.
     * @param {number} page - Page number.
     * @returns {XML}
     */
    renderBody(columns, datac, nRows, page) {
        if (datac) {
            if (datac.length > 0) {
                return datac.slice((page - 1) * nRows, page * nRows).map((obj, index) => {
                    return <DataTableRow obj={obj} key={index} index={index} meta={columns}/>
                })
            } else {
                return (
                    <TableRow>
                        <TableRowColumn>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <h3>Ingen data</h3>
                            </div>
                        </TableRowColumn>
                    </TableRow>
                );
            }
        } else {
            return (
                <TableRow>
                    <TableRowColumn>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </div>
                    </TableRowColumn>
                </TableRow>
            );
        }

    }

    /**
     * Renders the footer.
     * @param {Array.<Object>} datac - Data used to populate the table.
     * @param {Number} nRows - Number of rows.
     * @param {Number} page - Page number.
     * @param {String} table - Table name.
     * @param {Function} tablePage - Function to change page.
     * @param {Function} tableRows - Function to change number of visible rows.
     * @returns {XML}
     */
    renderFooter(datac, nRows, page, table, tablePage, tableRows) {
        if (datac) {
            return (
                <TableRow>
                    <TableRowColumn style={{width: '100%'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <span>Rader per side:</span>
                            <DropDownMenu
                                value={nRows}
                                onChange={(event, key, value) => {tableRows(table, value)}}
                                underlineStyle={{}}
                            >
                                <MenuItem value={10} primaryText="10"/>
                                <MenuItem value={20} primaryText="20"/>
                                <MenuItem value={40} primaryText="40"/>
                                <MenuItem value={100} primaryText="100"/>
                            </DropDownMenu>


                            <span>{(page-1)*nRows+1}-{page*nRows < datac.length ? page*nRows : datac.length}of{datac.length}</span>
                            <IconButton onClick={() => tablePage(table, page > 1 ? page - 1 : 1)}>
                                <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
                            </IconButton>
                            <IconButton onClick={() => tablePage(table, page < datac.length / nRows ? page + 1 : page)}>
                                <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
                            </IconButton>
                        </div>
                    </TableRowColumn>
                </TableRow>
            );
        }
        return null;
    }

    /**
     * Renders the toolbar if provided.
     * @returns {XML}
     */
    renderToolbar() {
        const { toolbar } = this.props.config;
        return toolbar ? <DataTableToolbar onSearch={this.searchData} {...toolbar}/> : null
    }

    /**
     * Search method. Uses input as regex.
     * Returns an array with matching object.
     * If nothing matches, an empty array is returned or if input is empty, null.
     * @param {Object} event
     * @param {String} input - User input.
     */
    searchData(event, input) {
        const { config, tableSearchData } = this.props;
        const { data, table, toolbar } = config;
        const search = toolbar.search;

        if (!input || input.length === 0 ) {
            tableSearchData(table, null)
        } else {
            const datac = data ? (data instanceof Array ? data : Object.values(data)) : [];
            const result = [];
            const regex = new RegExp(input, 'i');
            const properties = search.split('|');
            datac.forEach(obj => {
                properties.forEach(prop => {
                    if (obj[prop].match(regex)) {
                        result.push(obj);
                    }
                });
            });
            tableSearchData(table, result);
        }

    }

    /**
     * Returns an array with data to display in the table.
     * @returns {Array.<Object>}
     */
    getData() {
        const { tables } = this.props;
        const { table, data } = this.props.config;
        let datac;

        if (tables[table]) {
            if (tables[table].searchData) {
                datac = tables[table].searchData;
            } else {
                datac = data ? (data instanceof Array ? data : Object.values(data)) : null;
            }
        } else {
            datac = data ? (data instanceof Array ? data : Object.values(data)) : null
        }

        return datac;
    }

    /**
     * Renders the table.
     * @returns {XML}
     */
    render() {
        const { config, tables, tablePage, tableRows, onSelection } = this.props;
        const { table, columns } = config;
        const page = tables[table] ? tables[table].page : 1;
        const nRows = tables[table] ? tables[table].nRows : 10;
        const datac = this.getData();

        return (
            <div>
                {this.renderToolbar()}
                <Table
                    selectable={onSelection ? true : false}
                    onRowSelection={onSelection ? (index) => {onSelection(datac[(page-1)*nRows+index[0]])} : () => {}}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <DataTableHeaderRows meta={columns}/>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                    >
                        {this.renderBody(columns, datac, nRows, page)}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        {this.renderFooter(datac, nRows, page, table, tablePage, tableRows)}
                    </TableFooter>
                </Table>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        tables: state.tableReducer.tables
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        tablePage: (table, page) => {
            dispatch(tablePage(table, page));
        },
        tableRows: (table, nRows) => {
            dispatch(tableRows(table, nRows));
        },
        tableSearchData: (table, data) => {
            dispatch(tableSearchData(table, data));
        },
        tableSearchValue: (table, value) => {
            dispatch(tableSearchValue(table, value))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);