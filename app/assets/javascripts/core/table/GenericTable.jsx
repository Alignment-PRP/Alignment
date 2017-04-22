import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { tablePage, tableRows } from './../../redux/actions/tableActions';
import GenericTableHeaderRows from './GenericTableHeaderRows';
import GenericTableRow from './GenericTableRow';
import GenToolbar from "./GenToolbar";

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
 * |field|String|Yes|null|Determines the attribute in the data object to populate the column.|
 * |wrap|Boolean|no|false|Determines if the text should wrap or not.|
 * |width|String|Yes|null|Column width|
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
 * |type|String|Yes|null|Determines rendering method based on predefined types. Valid types are: `LINK`, `EDIT_LINK` and `DELETE_LINK.|
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
 * |render|Function|No|null|Method for rendering components inside the toolbar. Could be a ToolbarGroup with buttons and text.|
 *
 * @example
 * import React from 'react';
 * import GenericTable from './GenericTable.jsx';
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
 *           <GenericTable metaData={metaData}/>
 *       );
 *   }
 *
 * }
 *
 * export default ExampleTable;
 */
class GenericTable extends React.Component {

    render() {
        const { metaData, tables, tablePage, tableRows, onSelection } = this.props;
        const { table, data, columns, toolbar } = metaData;
        const page = tables[table] ? tables[table].page : 1;
        const nRows = tables[table] ? tables[table].nRows : 10;
        const _data = data ? (data instanceof Array ? data : Object.values(data)) : [];

        return (
            <div>
                {toolbar ? <GenToolbar {...toolbar}/> : null }
                <Table
                    selectable={onSelection ? true : false}
                    onRowSelection={onSelection ? (index) => {onSelection(_data[(page-1)*nRows+index[0]])} : () => {}}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <GenericTableHeaderRows meta={columns}/>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                    >
                        {_data ?
                            _data.length > 0 ?
                                _data.slice((page-1)*nRows, page*nRows).map((obj, index, objects, ...injectedRowProps) => {
                                    return <GenericTableRow obj={obj} key={index} index={index} meta={columns} {...injectedRowProps} />
                                })
                                :
                                <TableRow>
                                    <TableRowColumn>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <h3>Ingen data</h3>
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                            :
                            <TableRow>
                                <TableRowColumn>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <CircularProgress/>
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        }
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
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


                                    <span>{(page-1)*nRows+1}-{page*nRows < _data.length ? page*nRows : _data.length}of{_data.length}</span>
                                    <IconButton onClick={() => tablePage(table, page > 1 ? page - 1 : 1)}>
                                        <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
                                    </IconButton>
                                    <IconButton onClick={() => tablePage(table, page < _data.length / nRows ? page + 1 : page)}>
                                        <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
                                    </IconButton>
                                </div>
                            </TableRowColumn>
                        </TableRow>
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenericTable);
