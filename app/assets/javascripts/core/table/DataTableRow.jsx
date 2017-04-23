import React from 'react';
import { TableRow } from 'material-ui/Table';
import DataTableRowColumn from './DataTableRowColumn';

class DataTableRow extends React.Component {

    render() {
        const { obj, meta, index, ...injectedRowProps } = this.props;
        return (
            <TableRow key={index} {...injectedRowProps}>
                {meta.map((row, index, objects, ...injectedColumnProps) => {
                    return <DataTableRowColumn obj={obj} row={row} key={index} {...injectedColumnProps}/>
                })}
            </TableRow>
        );
    }

}

export default DataTableRow;
