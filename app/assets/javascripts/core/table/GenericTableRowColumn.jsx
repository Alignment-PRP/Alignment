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
        const defaultStyle = {...icp.style, width: row.width, maxWidth: row.width};
        const link = row.link + (row.linkField ? obj[row.linkField] : '');
        const onClick = row.action ? row.action.bind(null, obj) : null;

        switch (row.type) {
            case "LINK":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <Link to={link}>
                            <RaisedButton label={row.label}/>
                        </Link>
                    </TableRowColumn>
                );
            case "EDIT_LINK":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <Link to={link}>
                            <IconButton>
                                <FontIcon className="material-icons">edit</FontIcon>
                            </IconButton>
                        </Link>
                    </TableRowColumn>
                );
            case "EDIT_ACTION":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <IconButton onClick={onClick}>
                            <FontIcon className="material-icons">edit</FontIcon>
                        </IconButton>
                    </TableRowColumn>
                );
            case "EDIT_LINK_ACTION":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <Link to={link}>
                            <IconButton onClick={onClick}>
                                <FontIcon className="material-icons">edit</FontIcon>
                            </IconButton>
                        </Link>
                    </TableRowColumn>
                );
            case "DELETE_LINK":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <Link to={link}>
                            <IconButton>
                                <FontIcon className="material-icons">delete</FontIcon>
                            </IconButton>
                        </Link>
                    </TableRowColumn>
                );
            case "DELETE_ACTION":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <IconButton onClick={onClick}>
                            <FontIcon className="material-icons">delete</FontIcon>
                        </IconButton>
                    </TableRowColumn>
                );
            default:
                return (
                    <TableRowColumn
                        {...icp}
                        style={
                            row.wrap ?
                                {...icp.style, width: row.width, maxWidth: row.width, whiteSpace: 'normal', wordWrap: 'break-word'}
                                :
                                defaultStyle
                            }
                    >
                        {obj[row.field]}
                    </TableRowColumn>
                );
        }
    }

}

export default GenericTableRowColumn;
