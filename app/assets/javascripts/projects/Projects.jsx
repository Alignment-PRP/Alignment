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
            return <ProjectListItem key={index}
                                    index={item.pid}
                                    name={item.p_name}
                                    descripton={item.p_desc}
                                    owner={item.po_username}
                                    manager={item.pm_username} /> }
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
                            <th>Beskrivelse</th>
                            <th>Project owner</th>
                            <th>Project manager</th>
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