import React from 'react';
import {connect} from "react-redux";

import { getPublicProjects, getPrivateProjects, getArchivedProjects, postProjectNew, changeProjectsTableMode } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import {changeProjectFormMode, snackBar} from './../redux/actions/projectFormActions.jsx';

import ProjectTable from './presentational/ProjectTable.jsx';
import ProjectForm from './form/ProjectForm.jsx';
import Snackbar from 'material-ui/Snackbar';
import ProjectsSideMenu from './ProjectsSideMenu.jsx';
import ProjectFormDialog from './form/ProjectFormDialog.jsx';


/**
 * Class represents /projects.
 * @see ProjectTable
 * @see ProjectForm
 * @see Project
 *
 * @param {Array.<Project>} publicProjects
 * @param {Array.<Project>} privateProjects
 * @param {Array.<Project>} archivedProjects
 * @param {string} tableMode
 * @param {boolean} formMode
 * @param {Snack} snack
 *
 * @param {function} postProjectNew {@link module:redux/actions/project.postProjectNew}
 * @param {function} getPublicProjects {@link module:redux/actions/project.getPublicProjects}
 * @param {function} getPrivateProjects {@link module:redux/actions/project.getPrivateProjects}
 * @param {function} getArchivedProjects {@link module:redux/actions/project.getArchivedProjects}
 * @param {function} changeProjectFormMode {@link module:redux/actions/project.changeProjectFormMode}
 * @param {function} changeProjectTableMode {@link module:redux/actions/projectForm.changeProjectTableMode}
 * @param {function} snackBar {@link module:redux/actions/projectForm.snackBar}
 * @param {function} changeSideMenuMode {@link module:redux/actions/sideMenu.changeSideMenuMode}
 */
class Projects extends React.Component {

    componentDidMount(){
        this.props.getPublicProjects();
        this.props.getPrivateProjects();
        this.props.getArchivedProjects();
        this.props.changeSideMenuMode("HIDE");
        this.props.changeProjectFormMode(true);
        this.props.changeProjectsTableMode("PUBLIC");
    }

    /**
     * Closes the snackbar.
     */
    closeSnack() {
        this.props.snackBar(false, "");
    }

    _projects(mode) {
        switch (mode) {
            case "PUBLIC":
                return this.props.publicProjects;
            case "PRIVATE":
                return this.props.privateProjects;
            case "ARCHIVED":
                return this.props.archivedProjects;
        }
    }

    _title(mode) {
        switch (mode) {
            case "PUBLIC":
                return <h2>Åpne Prosjekter</h2>;
            case "PRIVATE":
                return <h2>Mine Prosjekter</h2>;
            case "ARCHIVED":
                return <h2>Arkiverte Prosjekter</h2>;
        }
    }

    /**
     * Render method
     * @returns {XML}
     */
    render(){
        const {
            formMode, tableMode, snack,
            postProjectNew,
            changeProjectFormMode,
            changeProjectsTableMode
        } = this.props;
        return (
            <div>
                <div className="containerUsers">
                    <ProjectsSideMenu
                        className="projects-sidemenu"
                        handleUser={() => changeProjectsTableMode("PRIVATE")}
                        handleAll={() => changeProjectsTableMode("PUBLIC")}
                        handleArchived={() => changeProjectsTableMode("ARCHIVED")}
                        handleNew={() => changeProjectFormMode(false)}
                    />
                    <div className="usertable">
                        {this._title(tableMode)}
                        <ProjectTable projects={this._projects.bind(this, tableMode)()}/>
                    </div>
                    <ProjectFormDialog
                        title="Nytt Prosjekt"
                        open={!formMode}
                        handleSubmit={(values, dispatch, props) => {postProjectNew(values, dispatch, props); changeProjectFormMode(true)}}
                        onRequestClose={() => {changeProjectFormMode(true)}}
                    />
                    <Snackbar
                        open={snack.open}
                        message={snack.text}
                        autoHideDuration={4000}
                        onRequestClose={this.closeSnack.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        publicProjects: state.projectReducer.publicProjects,
        privateProjects: state.projectReducer.privateProjects,
        archivedProjects: state.projectReducer.archivedProjects,
        tableMode: state.projectReducer.tableMode,
        formMode: state.projectFormReducer.mode,
        snack: state.projectFormReducer.snack,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPublicProjects: () => {
            dispatch(getPublicProjects());
        },
        getPrivateProjects: () => {
            dispatch(getPrivateProjects());
        },
        getArchivedProjects: () => {
            dispatch(getArchivedProjects());
        },
        changeProjectsTableMode: (mode) => {
            dispatch(changeProjectsTableMode(mode));
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
        snackBar: (bool, text) => {
            dispatch(snackBar(bool, text))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);