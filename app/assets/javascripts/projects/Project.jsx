import React from 'react';
import {connect} from 'react-redux'
import ProjectRequirements from '../requirements/ProjectRequirements.jsx';
import { getProjectById } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { getRequirementsByProjectId } from '../redux/actions/projectActions.jsx';
import { getAllRequirements } from '../redux/actions/requirementActions.jsx';
import ProjectRequirementsFilter from '../sidemenu/filters/ProjectRequirementsFilter.jsx'
import AddRequirementsToProjectFilter from '../sidemenu/filters/AddRequirementsToProjectFilter.jsx';
import AllRequirementsAdd from '../requirements/AllRequirementsAdd.jsx';

class Project extends React.Component {

    constructor(props){
        super(props);

        this.state = ({
            projectRequirements: [],
            projectRequirementFilter: [],
            allRequirements: [],
            allRequirementFilter: []
        });


        this.updateProjectRequirementFilter = this.updateProjectRequirementFilter.bind(this);
        this.updateProjectRequirements = this.updateProjectRequirements.bind(this);
        this.updateAddRequirementsFilter = this.updateAddRequirementsFilter.bind(this);
    }


    updateProjectRequirementFilter(category){
        this.setState({
            projectRequirementFilter: category
        });
        this.updateProjectRequirements();
    }

    updateProjectRequirements(){
        const allRequirements = this.props.allRequirements;
        const newFilterRequirementList = [];
        const categoryFilter = this.state.filter;

        for (let requirement of allRequirements){
            console.log(requirement);
            for (let category of categoryFilter){
                console.log(category);
                if (category == requirement.cname){
                    newFilterRequirementList.push(requirement);
                }

            }
        }
        console.log(newFilterRequirementList);
    }

    updateAddRequirementsFilter(){
        const allRequirements = this.props.allRequirements;
        const newFilterRequirementList = [];
        const categoryFilter = this.state.filter;

        for (let requirement of allRequirements){
            console.log(requirement);
            for (let category of categoryFilter){
                console.log(category);
                if (category == requirement.cname){
                    newFilterRequirementList.push(requirement);
                }

            }
        }
    }


    componentDidMount() {
        this.props.getAllRequirements();
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
                <AddRequirementsToProjectFilter filter={this.state.allRequirementsFilter}
                                                allRequirements={this.props.allRequirements}
                                                onChangeHandler={this.updateAddRequirementsFilter}
                                                title="Add Requirement To Project Filter" />

                <AllRequirementsAdd requirements={this.props.allRequirements} filter={this.state.allRequirementFilter}/>

                <div className="projectRequirements">
                    <ProjectRequirements requirements={this.props.projectRequirements}/>
                </div>

                {/* <ProjectRequirementsFilter filter={this.state.projectRequirementFilter}
                                           projectRequirements={this.props.projectRequirements}
                                           onChangeHandler={this.updateProjectRequirementFilter}
                                           title="Project Requirement Filter" /> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.projectReducer.project,
        projectRequirements: state.projectReducer.projectRequirements,
        allRequirements: state.requirementReducer.requirements
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
        },
        getAllRequirements: () => {
            dispatch(getAllRequirements())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);