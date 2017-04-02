import React from 'react';
import { Link } from 'react-router';

class RequirementListItem extends React.Component {

    render() {
        const {requirement, updateRequirement, deleteRequirement } = this.props;
        return (
            <tr>
                <td>{requirement.name}</td>
                <td>{requirement.description}</td>
                <td>{requirement.comment}</td>
                <td>{requirement.cName}</td>
                <td>{requirement.scName}</td>
                <td><Link to="editrequirement"><button onClick={() => updateRequirement(requirement)}>Rediger</button></Link></td>
                <td><button onClick={() => deleteRequirement(requirement.RID)}>Slett</button></td>
            </tr>
        );
    }
}

export default RequirementListItem;