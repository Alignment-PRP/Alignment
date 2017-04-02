import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

export default class RequirementListItemMiniDelete extends React.Component {

    render() {
        const requirement = this.props.requirement;
        return (
            <TableRow>
                <TableRowColumn>{requirement.name}</TableRowColumn>
                <TableRowColumn>{requirement.description}</TableRowColumn>
                <TableRowColumn><RaisedButton secondary={true} onClick={() => this.props.onClickHandler(requirement)} label="Slett"/></TableRowColumn>
            </TableRow>
        );
    }
}