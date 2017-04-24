import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions";
import { postUpdateRequirement } from "../redux/actions/requirementActions";
import { getUsersWithClass } from "../redux/actions/userActions";


import RequirementFormUpdate from './form/RequirementFormUpdate';

class UpdateRequirement extends React.Component {

    componentDidMount() {
        this.props.changeSideMenuMode("HIDE");
        this.props.getUsersWithClass();
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
            <RequirementFormUpdate users={this.props.users}
                                   categories={this.props.categories}
                                   structure={structure}
                                   onSubmit={this.props.postUpdateRequirement}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
        categories: state.requirementReducer.categoryNames,
        users: state.userReducer.users ? state.userReducer.users : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
        postUpdateRequirement: (requirement) => {
            dispatch(postUpdateRequirement(requirement))
        },
        getUsersWithClass: () => {
            dispatch(getUsersWithClass())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequirement);