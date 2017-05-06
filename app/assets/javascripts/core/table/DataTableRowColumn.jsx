import React from 'react';
import { Link } from 'react-router';
import Truncate from 'react-truncate';
import {FontIcon, IconButton, TableRowColumn} from "material-ui";

const LinkTo = ({icp, style, link, icon}) => {
    return (
        <TableRowColumn {...icp} style={{...style, padding: '1px 12px 1px 12px'}}>
            <Link to={link}>
                <IconButton style={{padding: 0, width: '24px', height: '24px'}}>
                    <FontIcon className="material-icons">{icon}</FontIcon>
                </IconButton>
            </Link>
        </TableRowColumn>
    );
};

const Action = ({icp, style, onClick, icon}) => {
    return (
        <TableRowColumn {...icp} style={{...style, padding: '1px 12px 1px 12px'}}>
            <IconButton onClick={onClick}  style={{padding: 0, width: '24px', height: '24px'}} tooltip={icon} tooltipPosition={"left"}>
                <FontIcon className="material-icons">{icon}</FontIcon>
            </IconButton>
        </TableRowColumn>
    );
};

class DataTableRowColumn extends React.Component {

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
                            <IconButton onClick={onClick} tooltip="Edit requirement">
                                <FontIcon className="material-icons" >edit</FontIcon>
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
                    <TableRowColumn{...icp} style={defaultStyle}>
                        {row.wrap ?
                            <div style={{padding: '12px 0 12px 0'}}>
                                <Truncate lines={row.wrap.lines ? row.wrap.lines : 4} ellipsis={row.wrap.ellipsis ? row.wrap.ellipsis(obj) : <span>... </span>}>
                                    {obj[row.property]}
                                </Truncate>
                            </div>
                            :
                            obj[row.property]
                        }
                    </TableRowColumn>
                );
        }
    }

}

export default DataTableRowColumn;