import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { postUpdateRequirement } from "../redux/actions/requirementActions.jsx";

import RequirementFormUpdate from './form/RequirementFormUpdate.jsx';

class UpdateRequirement extends React.Component {

    componentDidMount(){
        this.props.changeSideMenuMode("HIDE");
    }

    render() {

        const structure = [
            {
                source: "something"
            },
            {
                artifact: "something"
            },
            {
                response: "something"
            },
            {
                responsemeasure: "something"
            },
            {
                environment: "something"
            },
            {
                stimulus: "something"
            }
        ];

        return (
            <RequirementFormUpdate structure={structure} onSubmit={this.props.postUpdateRequirement} />
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
        postUpdateRequirement: (requirement) => {
            dispatch(postUpdateRequirement(requirement))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequirement);