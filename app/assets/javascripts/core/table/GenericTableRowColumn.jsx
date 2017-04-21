import React from 'react';
import { Link } from 'react-router';
import { TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

const LinkTo = ({icp, style, link, icon}) => {
    return (
        <TableRowColumn {...icp} style={style}>
            <Link to={link}>
                <IconButton>
                    <FontIcon className="material-icons">{icon}</FontIcon>
                </IconButton>
            </Link>
        </TableRowColumn>
    );
};

const Action = ({icp, style, onClick, icon}) => {
    return (
        <TableRowColumn {...icp} style={style}>
            <IconButton onClick={onClick}>
                <FontIcon className="material-icons">{icon}</FontIcon>
            </IconButton>
        </TableRowColumn>
    );
};

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
                return <LinkTo icp={icp} style={defaultStyle} link={link} icon="edit" />;
            case "EDIT_ACTION":
                return <Action icp={icp} style={defaultStyle} onClick={onClick} icon="edit" />;
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
                return <LinkTo icp={icp} style={defaultStyle} link={link} icon="delete" />;
            case "DELETE_ACTION":
                return <Action icp={icp} style={defaultStyle} onClick={onClick} icon="delete" />;
            case "ADD_ACTION":
                return <Action icp={icp} style={defaultStyle} onClick={onClick} icon="add" />;
            default:
                return (
                    <TableRowColumn
                        {...icp}
                        style={
                            row.wrap ?
                                {...icp.style, width: row.width, maxWidth: row.width, maxHeight: '100px', overflow: 'hidden' , whiteSpace: 'normal', wordWrap: 'break-word'}
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
