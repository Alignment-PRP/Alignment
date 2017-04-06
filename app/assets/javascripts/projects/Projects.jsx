import React from 'react';
import {connect} from "react-redux";
import { push } from 'react-router-redux';
import { getPublicProjects, getPrivateProjects, getArchivedProjects, postProjectNew, deleteProject, changeProjectsTableMode } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { snackBar } from './../redux/actions/projectFormActions.jsx';
import { dialogOpen, dialogChangeAction } from './../redux/actions/dialogActions.jsx';
import ProjectTable from './ProjectTable.jsx';
import Snackbar from 'material-ui/Snackbar';
import ProjectsSideMenu from './presentational/ProjectsSideMenu.jsx';
import ProjectNewDialog from './dialog/ProjectNewDialog.jsx';
import DeleteDialog from "./../core/dialog/DeleteDialog.jsx";


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
        this.props.newDialog(false);
        this.props.deleteDialog(false);

        switch (this.props.path.replace('/projects/', '')) {
            case "private":
                this.props.changeProjectsTableMode("PRIVATE");
                break;
            case "archive":
                this.props.changeProjectsTableMode("ARCHIVED");
                break;
            default:
                this.props.changeProjectsTableMode("PUBLIC");
        }
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
            newDialogIsOpen, deleteDialogIsOpen,
            newDialog, deleteDialog, deleteDialogAction, deleteDialogChangeAction,
            tableMode, snack,
            postProjectNew,
            deleteProject,
            changeProjectsTableMode,
            push
        } = this.props;
        return (
            <div>
                <div className="containerUsers">
                    <ProjectsSideMenu
                        className="projects-sidemenu"
                        handleUser={() => {changeProjectsTableMode("PRIVATE"); push('/projects/private')}}
                        handleAll={() => {changeProjectsTableMode("PUBLIC"); push('/projects')}}
                        handleArchived={() => {changeProjectsTableMode("ARCHIVED"); push('/projects/archive')}}
                        handleNew={newDialog.bind(null, true)}
                    />
                    <div className="usertable">
                        {this._title(tableMode)}
                        <ProjectTable
                            projects={this._projects.bind(this, tableMode)()}
                            deleteProject={
                                (ID) => {
                                    deleteDialog(true);
                                    deleteDialogChangeAction(() => {deleteProject(ID); deleteDialog(false)})
                                }
                            }
                        />
                    </div>
                    <ProjectNewDialog
                        title="Nytt Prosjekt"
                        open={newDialogIsOpen}
                        handleSubmit={(values, dispatch, props) => {postProjectNew(values, dispatch, props); newDialog(false)}}
                        onRequestClose={newDialog.bind(null, false)}
                    />
                    <DeleteDialog
                        title="Slett Prosjekt"
                        desc="Er du sikker på at du vil slette prosjektet?"
                        open={deleteDialogIsOpen}
                        action={deleteDialogAction}
                        onRequestClose={deleteDialog.bind(null, false)}
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
    let path = state.router.location ? state.router.location.pathname : '/projects';
    return {
        path: path,
        publicProjects: state.projectReducer.publicProjects,
        privateProjects: state.projectReducer.privateProjects,
        archivedProjects: state.projectReducer.archivedProjects,
        tableMode: state.projectReducer.tableMode,
        newDialogIsOpen: state.dialogReducer.projectNew.isOpen,
        deleteDialogIsOpen: state.dialogReducer.projectDelete.isOpen,
        deleteDialogAction: state.dialogReducer.projectDelete.action,
        snack: state.projectFormReducer.snack,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (url) => {
            dispatch(push(url));
        },
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
        newDialog: (open) => {
            dispatch(dialogOpen('projectNew', open));
        },
        deleteDialog: (open) => {
            dispatch(dialogOpen('projectDelete', open));
        },
        deleteDialogChangeAction: (action) => {
            dispatch(dialogChangeAction('projectDelete', action))
        },
        snackBar: (bool, text) => {
            dispatch(snackBar(bool, text))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);