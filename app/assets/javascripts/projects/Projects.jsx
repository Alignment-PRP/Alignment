import React from 'react';
import {connect} from "react-redux";
import { getAllProjects, postProjectNew, deleteProject } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { changeProjectFormMode, projectClicked, fillProjectForm, snackBar } from './../redux/actions/projectFormActions.jsx';
import ProjectTable from './presentational/ProjectTable.jsx';
import ProjectForm from './form/ProjectForm.jsx';
import Snackbar from 'material-ui/Snackbar';

/**
 * Class represents /projects.
 * @see ProjectTable
 * @see ProjectForm
 * @see Project
 */
class Projects extends React.Component {

    componentDidMount(){
        this.props.getAllProjects();
        this.props.changeSideMenuMode("HIDE");
        this.props.changeProjectFormMode(true);
    }

    /**
     * Closes the snackbar.
     */
    closeSnack() {
        this.props.snackBar(false, "");
    }

    render(){
        const {
            projects, mode, snack,
            postProjectNew,
            changeProjectFormMode,
            fillProjectForm,
        } = this.props;
        return (
            <div className="containerUsers">
                <div className="form">
                    <ProjectForm
                        disabled={mode}
                        onSubmit={postProjectNew}
                        handleCreate={() => {fillProjectForm({}); changeProjectFormMode(false)}}
                        handleClear={() => {fillProjectForm({}); changeProjectFormMode(true)}}
                    />
                </div>
                <div className="usertable">
                    <ProjectTable projects={projects} projectClicked={() => {}} deleteProject={this.props.deleteProject}/>
                </div>
                <Snackbar
                    open={snack.open}
                    message={snack.text}
                    autoHideDuration={4000}
                    onRequestClose={this.closeSnack.bind(this)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projectReducer.projects,
        mode: state.projectFormReducer.mode,
        snack: state.projectFormReducer.snack,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProjects: () => {
            dispatch(getAllProjects());
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode));
        },
        postProjectNew: (data) => {
            dispatch(postProjectNew(data));
        },
        deleteProject: (id) => {
            dispatch(deleteProject(id));
        },
        changeProjectFormMode: (mode) => {
            dispatch(changeProjectFormMode(mode));
        },
        fillProjectForm: (data) => {
            dispatch(fillProjectForm(data));
        },
        snackBar: (bool, text) => {
            dispatch(snackBar(bool, text))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);