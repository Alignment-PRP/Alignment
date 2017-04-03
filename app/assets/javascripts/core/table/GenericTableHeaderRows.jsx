import React from 'react';
import {
    TableRow, TableHeaderColumn
} from 'material-ui/Table';

class GenericTableHeaderRows extends React.Component {

    render() {
        const { headers } = this.props;
        return (
            <TableRow>
                {headers.map((header, index) => {
                        if (header === "") return <TableHeaderColumn key={index}/>;
                        return <TableHeaderColumn key={index}>{header}</TableHeaderColumn>
                    }
                )}
            </TableRow>
        );
    }

}

export default GenericTableHeaderRows;
