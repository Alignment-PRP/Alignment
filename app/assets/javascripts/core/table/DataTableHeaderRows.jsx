import React from 'react';
import { TableRow, TableHeaderColumn } from 'material-ui/Table';

class DataTableHeaderRows extends React.Component {

    render() {
        const { meta, ...other } = this.props;
        return (
            <TableRow {...other}>
                {meta.map((row, index, objects, ...icp) => {
                        return row.label ?
                            <TableHeaderColumn style={{width: row.width, maxWidth: row.width}} key={index} {...icp} >{row.label}</TableHeaderColumn>
                            :
                            <TableHeaderColumn style={{width: row.width, maxWidth: row.width, padding: '1px 12px 1px 12px'}} key={index} {...icp}><div style={{width: '24px', height: '48px'}}/></TableHeaderColumn>;
                    }
                )}
            </TableRow>
        );
    }

}

export default DataTableHeaderRows;