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
        switch (row.type) {
            case "LINK":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <Link to={row.link + obj[row.linkField]}>
                            <RaisedButton label={row.label}/>
                        </Link>
                    </TableRowColumn>
                );
            case "EDIT_LINK":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <Link to={row.link + obj[row.linkField]}>
                            <IconButton>
                                <FontIcon className="material-icons">edit</FontIcon>
                            </IconButton>
                        </Link>
                    </TableRowColumn>
                );
            case "EDIT_ACTION":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <IconButton onClick={row.action.bind(null, obj[row.param])}>
                            <FontIcon className="material-icons">edit</FontIcon>
                        </IconButton>
                    </TableRowColumn>
                );
            case "DELETE_LINK":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <Link to={row.link + obj[row.linkField]}>
                            <IconButton>
                                <FontIcon className="material-icons">delete</FontIcon>
                            </IconButton>
                        </Link>
                    </TableRowColumn>
                );
            case "DELETE_ACTION":
                return (
                    <TableRowColumn {...icp} style={defaultStyle}>
                        <IconButton onClick={row.action.bind(null, obj[row.param])}>
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
