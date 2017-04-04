import React from 'react';
import {
    TableRow, TableHeaderColumn
} from 'material-ui/Table';

class GenericTableHeaderRows extends React.Component {

    render() {
        const { meta } = this.props;
        return (
            <TableRow>
                {meta.map((row, index) => {
                        return row.label ?
                            <TableHeaderColumn style={{width: row.width}} key={index}>{row.label}</TableHeaderColumn>
                            :
                            <TableHeaderColumn key={index}/>;
                    }
                )}
            </TableRow>
        );
    }

}

export default GenericTableHeaderRows;
