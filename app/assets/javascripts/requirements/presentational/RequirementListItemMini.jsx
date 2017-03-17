import React from 'react';

export default class RequirementListItemCheckbox extends React.Component {

    render() {
        const requirement = this.props.requirement;
        return (
            <tr>
                <td>{requirement.name}</td>
                <td>{requirement.description}</td>
            </tr>

        );
    }
}
