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
                <TableFooter>
                    <TableRow>
                        <TableRowColumn>
                            {/*TODO add row selection*/}
                            <span>{(page-1)*nRows+1}-{page*nRows < objects.length ? page*nRows : objects.length}of{objects.length}</span>
                            <IconButton onClick={() => tablePage(page > 1 ? page - 1 : 1)}>
                                <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
                            </IconButton>
                            <IconButton onClick={() => tablePage(page < objects.length / nRows ? page + 1 : page)}>
                                <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }

}

export default GenericTable;
