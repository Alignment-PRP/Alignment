import React from 'react';
import {Link} from 'react-router';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Represents a TableRow with project data.
 * @see ProjectTable
 * @see Project
 */
class GenericTableRow extends React.Component {

    _generateRow(obj, row, index) {
        switch (row.type) {
            case "DEFAULT":
                return <TableRowColumn key={index}>{obj[row.field]}</TableRowColumn>;
            case "LINK":
                return <TableRowColumn key={index}><Link to={row.link + obj[row.linkField]}><RaisedButton label={row.label}/></Link></TableRowColumn>;
        }
    }

    render() {
        const { obj, meta, index, ...extra } = this.props;
        return (
            <TableRow key={index} {...extra}>
                {meta.map((row, index) => {
                    return this._generateRow(obj, row, index);
                })}
            </TableRow>
        );
    }

}

export default GenericTableRow;
