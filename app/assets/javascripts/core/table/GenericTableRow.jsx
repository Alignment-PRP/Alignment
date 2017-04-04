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
        const { obj, meta, index, ...injectedRowProps } = this.props;
        return (
            <TableRow key={index} {...injectedRowProps}>
                {meta.map((row, index, objects, ...injectedColumnProps) => {
                    return <GenericTableRowColumn obj={obj} row={row} key={index} {...injectedColumnProps}/>
                })}
            </TableRow>
        );
    }

}

export default GenericTableRow;
