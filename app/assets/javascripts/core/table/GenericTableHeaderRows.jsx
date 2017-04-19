import React from 'react';
import { TableRow, TableHeaderColumn } from 'material-ui/Table';

class GenericTableHeaderRows extends React.Component {

    render() {
        const { meta, ...other } = this.props;
        return (
            <TableRow {...other}>
                {meta.map((row, index, objects, ...icp) => {
                        return row.label ?
                            <TableHeaderColumn style={{width: row.width, maxWidth: row.width}} key={index} {...icp} >{row.label}</TableHeaderColumn>
                            :
                            <TableHeaderColumn style={{width: row.width, maxWidth: row.width}} key={index} {...icp}/>;
                    }
                )}
            </TableRow>
        );
    }

}

export default GenericTableHeaderRows;
