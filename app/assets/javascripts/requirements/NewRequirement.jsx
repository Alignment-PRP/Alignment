import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { AddRequirement } from "../redux/actions/requirementActions.jsx";

import NewRequirementForm from './form/NewRequirementForm.jsx';

class UpdateRequirement extends React.Component {

    componentDidMount(){
        this.props.changeSideMenuMode("HIDE");
    }

    render() {
        return (
            <NewRequirementForm onSubmit={this.props.addRequirement}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
        addRequirement: (requirement) => {
            dispatch(addRequirement(requirement))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequirement);