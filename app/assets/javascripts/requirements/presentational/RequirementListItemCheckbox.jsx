import React from 'react';
import { Link } from 'react-router';

import {connect} from "react-redux";
import { updateRequirement } from "../../redux/actions/requirementActions.jsx";;

class RequirementListItemCheckbox extends React.Component {
    constructor(props){
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this);

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
                <td>{requirement.source}</td>
                <td>{requirement.stimulus}</td>
                <td>{requirement.artifact}</td>
                <td>{requirement.response}</td>
                <td>{requirement.responsemeasure}</td>
                <td>{requirement.environment}</td>
                <td>{requirement.cname}</td>
                <td>{requirement.cdesc}</td>
                <td><Link to="editrequirement"><button onClick={() => this.handleOnClick()}>Rediger</button></Link></td>
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

export default connect(null, mapDispatchToProps)(RequirementListItemCheckbox);