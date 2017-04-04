import React from 'react';
import { TableRow } from 'material-ui/Table';
import GenericTableRowColumn from './GenericTableRowColumn.jsx';

/**
 * Represents a TableRow with project data.
 * @see ProjectTable
 * @see Project
 */
class GenericTableRow extends React.Component {

    render() {
        const { obj, meta, index, ...extra } = this.props;
        return (
            <TableRow key={index} {...extra}>
                {meta.map((row, index) => {
                    return <GenericTableRowColumn obj={obj} row={row} key={index}/>
                })}
            </TableRow>
        );
    }

}

export default GenericTableRow;
