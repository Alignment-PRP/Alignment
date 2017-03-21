import React from 'react';
import {connect} from 'react-redux'
import ProjectRequirements from '../requirements/ProjectRequirements.jsx';
import { getProjectById } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { getRequirementsByProjectId } from '../redux/actions/projectActions.jsx';
import ProjectRequirementsFilter from '../sidemenu/filters/ProjectRequirementsFilter.jsx'
import AddRequirementsToProjectFilter from '../sidemenu/filters/AddRequirementsToProjectFilter.jsx';
import AllRequirementsAdd from '../requirements/AllRequirementsAdd.jsx';

class Project extends React.Component {

    componentDidMount() {
        this.props.getProjectById(this.props.params.id);
        this.props.getRequirementsByProjectId(this.props.params.id);
        this.props.changeSideMenuMode("HIDE");
    }

    renderProject(){
        let id = "";
        let name = "";
        let desc = "";

        this.props.project.map((item)=>{
            id = item.projectid;
            name = item.name;
            desc = item.description;
        });

        return(
            <div className="singleProject">
                <h1>{name}</h1>
                <p>ID: {id}</p>
                <p>Beskrivelse:{desc}</p>
            </div>

        );
    }


    render() {
        return (
            <div className="container">
                <ProjectRequirementsFilter title="Project Requirement Filter" />
                <div className="projectRequirements">
                    <ProjectRequirements requirements={this.props.projectRequirements}/>
                </div>
                <AllRequirementsAdd />
                <AddRequirementsToProjectFilter title="Add Requirement To Project Filter" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.projectReducer.project,
        projectRequirements: state.projectReducer.projectRequirements
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectById: (id) => {
            dispatch(getProjectById(id))
        },
        getRequirementsByProjectId: (id) => {
            dispatch(getRequirementsByProjectId(id))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);