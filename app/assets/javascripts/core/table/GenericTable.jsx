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
 *               {label: 'Navn', field: 'name', width: '40%'},
 *               {label: 'Jobb', field: 'jobb', width: '60%'}
 *           ]
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
        const { table, objects, rowMeta, toolbar } = metaData;
        const page = tables[table] ? tables[table].page : 1;
        const nRows = tables[table] ? tables[table].nRows : 10;

        return (
            <div>
                {toolbar ? <GenToolbar {...toolbar}/> : null }
                <Table
                    selectable={onSelection ? true : false}
                    onRowSelection={onSelection ? (index) => {onSelection(objects[(page-1)*nRows+index[0]])} : () => {}}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <GenericTableHeaderRows meta={rowMeta}/>
                    </TableHeader>

                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                    >
                        {objects.length > 0 ?
                        objects.slice((page-1)*nRows, page*nRows).map((obj, index, objects, ...injectedRowProps) => {
                            return <GenericTableRow obj={obj} key={index} index={index} meta={rowMeta} {...injectedRowProps} />
                        })
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


                                    <span>{(page-1)*nRows+1}-{page*nRows < objects.length ? page*nRows : objects.length}of{objects.length}</span>
                                    <IconButton onClick={() => tablePage(table, page > 1 ? page - 1 : 1)}>
                                        <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
                                    </IconButton>
                                    <IconButton onClick={() => tablePage(table, page < objects.length / nRows ? page + 1 : page)}>
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
