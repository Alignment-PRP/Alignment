import React from 'react';
import { connect } from 'react-redux';
import {
    Table, TableBody, TableHeader,
    TableHeaderColumn, TableRow,
    TableRowColumn, TableFooter
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { tablePage, tableRows } from './../../redux/actions/tableActions.jsx';
import GenericTableHeaderRows from './GenericTableHeaderRows.jsx';
import GenericTableRow from './GenericTableRow.jsx';

/**
 * Generic table.
 *
 * @example
 * import React from 'react';
 * import { connect } from 'react-redux';
 * import { tablePage, tableRows } from './redux/actions/tableActions.jsx';
 * import GenericTable from './GenericTable.jsx';
 *
 *
 * class ExampleTable extends React.Component {
 *
 *   render() {
 *       const {
 *           page, nRows,
 *           changeTablePage,
 *           changeTableRows
 *       } = this.props;
 *
 *       const metaData = {
 *           page: page,
 *           nRows: nRows,
 *           objects: [
 *               {name: 'Bjarne', jobb: 'Lege'},
 *               {name: 'Idun', jobb: 'Lærer'},
 *               {name: 'Lise', jobb: 'Ingeniør'},
 *               {name: 'Arne', jobb: 'Vaktmester'}
 *           ],
 *           rowMeta: [
 *               {label: 'Navn', field: 'name', width: '40%'},
 *               {label: 'Jobb', field: 'jobb', width: '60%'}
 *           ]
 *       };
 *
 *       return (
 *           <GenericTable metaData={metaData} tablePage={changeTablePage} tableRows={changeTableRows}/>
 *       );
 *   }
 *
 * }
 *
 * const mapStateToProps = (state) => {
 *   return {
 *       page: state.tableReducer.example.page,
 *       nRows: state.tableReducer.example.nRows
 *   };
 * };
 *
 * const mapDispatchToProps = (dispatch) => {
 *   return {
 *       changeTablePage: (page) => {
 *           dispatch(tablePage('example', page))
 *       },
 *       changeTableRows: (nRows) => {
 *           dispatch(tableRows('example', nRows));
 *       }
 *   };
 * };

 * export default connect(mapStateToProps, mapDispatchToProps)(ExampleTable);
 */
class GenericTable extends React.Component {

    render() {
        const { metaData, tables, tablePage, tableRows, onSelection } = this.props;
        const { table, objects, rowMeta } = metaData;
        const page = tables[table] ? tables[table].page : 1;
        const nRows = tables[table] ? tables[table].nRows : 10;
        return (
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
                    {objects.slice((page-1)*nRows, page*nRows).map((obj, index, objects, ...injectedRowProps) => {
                        return <GenericTableRow obj={obj} key={index} index={index} meta={rowMeta} {...injectedRowProps} />
                    })}
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
