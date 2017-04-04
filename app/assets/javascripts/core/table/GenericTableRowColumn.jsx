import React from 'react';
import { Link } from 'react-router';
import { TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

class GenericTableRowColumn extends React.Component {

    render() {
        const { obj, row, ...injectedColumnProps } = this.props;
        const icp = injectedColumnProps;
        switch (row.type) {
            case "WRAP":
                return (
                    <TableRowColumn {...icp} style={{...icp.style, width: row.width, maxWidth: row.width, whiteSpace: 'normal', wordWrap: 'break-word'}}>
                        {obj[row.field]}
                    </TableRowColumn>
                    );
            case "LINK":
                return (
                    <TableRowColumn {...icp} style={{...icp.style, width: row.width, maxWidth: row.width}}>
                        <Link to={row.link + obj[row.linkField]}>
                            <RaisedButton label={row.label}/>
                        </Link>
                    </TableRowColumn>
                );
            case "EDIT":
                return (
                    <TableRowColumn {...icp} style={{...icp.style, width: row.width, maxWidth: row.width}}>
                        <Link to={row.link + obj[row.linkField]}>
                            <IconButton>
                                <FontIcon className="material-icons">edit</FontIcon>
                            </IconButton>
                        </Link>
                    </TableRowColumn>
                );
            default:
                return (
                    <TableRowColumn {...icp} style={{...icp.style, width: row.width, maxWidth: row.width}}>
                        {obj[row.field]}
                    </TableRowColumn>
                );
        }
    }

}

export default GenericTableRowColumn;
