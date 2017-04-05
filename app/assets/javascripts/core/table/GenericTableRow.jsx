import React from 'react';
import { TableRow } from 'material-ui/Table';
import GenericTableRowColumn from './GenericTableRowColumn.jsx';

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
