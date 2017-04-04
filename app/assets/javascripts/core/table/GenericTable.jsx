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
import GenericTableHeaderRows from './GenericTableHeaderRows.jsx';
import GenericTableRow from './GenericTableRow.jsx';

class GenericTable extends React.Component {

    render() {
        const { metaData, tablePage, tableRows, onSelection } = this.props;
        const { page, nRows, objects, rowMeta } = metaData;

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
                                    onChange={(event, key, value) => {tableRows(value)}}
                                    underlineStyle={{}}
                                >
                                    <MenuItem value={10} primaryText="10"/>
                                    <MenuItem value={20} primaryText="20"/>
                                    <MenuItem value={40} primaryText="40"/>
                                    <MenuItem value={100} primaryText="100"/>
                                </DropDownMenu>


                                <span>{(page-1)*nRows+1}-{page*nRows < objects.length ? page*nRows : objects.length}of{objects.length}</span>
                                <IconButton onClick={() => tablePage(page > 1 ? page - 1 : 1)}>
                                    <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
                                </IconButton>
                                <IconButton onClick={() => tablePage(page < objects.length / nRows ? page + 1 : page)}>
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

export default GenericTable;
