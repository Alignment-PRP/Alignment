import React from 'react';
import ProjectListItem from './presentational/ProjectListItem.jsx';
import {connect} from "react-redux";
import { getAllProjects } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";




class Projects extends React.Component {

    componentDidMount(){
        this.props.getAllProjects();
        this.props.changeSideMenuMode("PROJECTS_MENU");

    }

    generateProjectList(){
        return this.props.projects.map((item, index) => {
            return <ProjectListItem key={index} project={item} />
            }
        )
    }

    render(){
        return (
            <div className="all-project-list">
                <h2>Prosjekter</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Creator</th>
                            <th>Manager</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateProjectList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projectReducer.projects
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProjects: () => {
            dispatch(getAllProjects())
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);