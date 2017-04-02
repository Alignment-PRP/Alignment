import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

class RequirementListItem extends React.Component {

    render() {
        const {key, requirement, updateRequirement, deleteRequirement } = this.props;
        return (
            <TableRow key={key}>
                <TableRowColumn>{requirement.name}</TableRowColumn>
                <TableRowColumn>{requirement.description}</TableRowColumn>
                <TableRowColumn>{requirement.comment}</TableRowColumn>
                <TableRowColumn>{requirement.cName}</TableRowColumn>
                <TableRowColumn>{requirement.scName}</TableRowColumn>
                <TableRowColumn>
                    <Link to="editrequirement"><RaisedButton onClick={() => updateRequirement(requirement)} label="Rediger"/></Link>
                    <RaisedButton secondary={true} onClick={() => deleteRequirement(requirement.RID)} label="Slett"/>
                </TableRowColumn>
            </TableRow>
        );
    }
}

export default RequirementListItem;