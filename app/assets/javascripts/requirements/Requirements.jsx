import React from 'react';
import {connect} from "react-redux";
import RequirementTable from './presentational/RequirementsTable.jsx';
import { getAllRequirements, getAllCategoryNames, updateRequirement, deleteRequirement } from "../redux/actions/requirementActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class Requirements extends React.Component {

    componentDidMount(){
        this.props.getAllRequirements();
        this.props.getAllCategoryNames();
        this.props.changeSideMenuMode("FILTER");
    }


    render() {
        return (
            <RequirementTable allRequirements={this.props.requirements}
                                 filterRequirementList={this.props.filterRequirementList}
                                 filter={this.props.filter}
                                 deleteRequirement={this.props.deleteRequirement}
                                 updateRequirement={this.props.updateRequirement}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterRequirementList: state.requirementReducer.filterRequirementList,
        requirements: state.requirementReducer.requirements,
        filter: state.requirementReducer.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRequirements: () => {
            dispatch(getAllRequirements())
        },
        updateRequirement: (requirement) => {
            dispatch(updateRequirement(requirement))
        },
        deleteRequirement: (id) => {
            dispatch(deleteRequirement(id))
        },
        getAllCategoryNames: () => {
            dispatch(getAllCategoryNames())
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Requirements);