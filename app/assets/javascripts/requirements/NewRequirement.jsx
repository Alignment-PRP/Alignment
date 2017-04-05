import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { addRequirement } from "../redux/actions/requirementActions.jsx";
import { getUsersWithClass } from "../redux/actions/userActions.jsx";

import RequirementForm from './form/RequirementForm.jsx';

class NewRequirement extends React.Component {

    componentDidMount(){
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
            <RequirementForm structure={structure}
                             users={this.props.users}
                             categories={this.props.categories}
                             onSubmit={this.props.addRequirement}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
        categories: state.requirementReducer.categoryNames,
        users: state.userReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
        addRequirement: (requirement) => {
            dispatch(addRequirement(requirement))
        },
        getUsersWithClass: () => {
            dispatch(getUsersWithClass())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRequirement);