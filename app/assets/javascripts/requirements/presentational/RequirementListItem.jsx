import React from 'react';
import { Link } from 'react-router';

import {connect} from "react-redux";
import { updateRequirement } from "../../redux/actions/requirementActions.jsx";;

class RequirementListItem extends React.Component {
    constructor(props){
        super(props)


    }

    handleOnClick() {
        this.props.updateRequirement(this.props.requirement);
    }

    render() {
        const requirement = this.props.requirement;
        return (
            <tr>
                <td>{requirement.name}</td>
                <td>{requirement.description}</td>
                <td>{requirement.comment}</td>
                <td>{requirement.cName}</td>
                <td>{requirement.scName}</td>
                <td><Link to="editrequirement"><button onClick={() => this.handleOnClick()}>Rediger</button></Link></td>
                <td><button onClick={() => this.props.deleteRequirement(requirement.RID)}>Slett</button></td>
            </tr>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRequirement: (requirement) => {
            dispatch(updateRequirement(requirement))
        }
    };
};

export default connect(null, mapDispatchToProps)(RequirementListItem);