import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

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
            <RequirementFormUpdate structure={structure} />
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequirement);