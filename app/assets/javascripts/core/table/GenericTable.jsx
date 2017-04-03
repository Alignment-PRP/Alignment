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
        const { metaData, tablePage, tableRows } = this.props;
        const { headers, page, nRows, objects, rowMeta } = metaData;

        return (
            <Table>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <GenericTableHeaderRows headers={headers}/>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={false}
                >
                    {objects.slice((page-1)*nRows, page*nRows).map((obj, index, props, ...extra) => {
                        return <GenericTableRow obj={obj} key={index} index={index} meta={rowMeta} {...extra} />
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
