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
import React from 'react';
import {connect} from "react-redux";
import { push } from 'react-router-redux';
import {
    getProjectsPublic, getProjectsAccessible, getProjectsIsCreator, getProjectsIsManager,
    postProjectNew, deleteProject, clearInitEditProjectForm
} from "../redux/actions/projectActions";
import { dialogOpen, dialogChangeAction } from './../redux/actions/dialogActions';
import { popoverAnchor, popoverContent, popoverOpen, popoverAdd } from './../redux/actions/popoverActions';
import ProjectsSideMenu from './presentational/ProjectsSideMenu';
import ProjectNewDialog from './dialog/ProjectNewDialog';
import {
    Card, CardActions, CardHeader, CardText, CardTitle, CircularProgress, FlatButton, GridList,
    GridTile
} from "material-ui";
import {
    amber200, blue200, blueGrey200, brown200, cyan200, deepOrange200, deepPurple200, green200,
    grey200, indigo200, lightBlue200, lightGreen200, lime200, orange200, pink200,
    purple200, red200, teal200, yellow200
} from "material-ui/styles/colors";
import {Link} from "react-router";
import Popover from "../core/popover/Popover";

const colors = [
    red200, pink200, purple200, deepPurple200,
    indigo200, blue200, lightBlue200, cyan200,
    teal200, green200, lightGreen200, lime200,
    yellow200, amber200, orange200, deepOrange200,
    brown200, blueGrey200, grey200
];

class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.renderProjects = this.renderProjects.bind(this);
        this._projects = this._projects.bind(this);
    }

    componentWillMount() {
        this.props.popoverAdd('projects');
    }

    componentDidMount(){
        this.props.clearInitEditProjectForm();
        this.props.getProjectsPublic();
        this.props.getProjectsAccessible();
        this.props.getProjectsIsCreator();
        this.props.getProjectsIsManager();

        this.props.newDialog(false);
        this.props.deleteDialog(false);
    }

    /**
     *
     * @param mode
     * @returns {Array.<Project>}
     * @private
     */
    _projects(mode) {
        const { projectsPublic, projectsAccessible, projectsIsManager, projectsIsCreator } = this.props;
        switch (mode) {
            case 'private':
                if (projectsIsCreator && projectsIsManager) {
                    return Object.values({...projectsIsCreator, ...projectsIsManager});
                }
                return null;
            case 'accessible':
                return projectsAccessible ? Object.values(projectsAccessible) : null;
            default:
                return projectsPublic ? Object.values(projectsPublic) : null;
        }
    }

    _title(mode) {
        switch (mode) {
            case "private":
                return <h2>Mine Prosjekter</h2>;
            case "accessible":
                return <h2>Tilgjengelige Prosjekter</h2>;
            default:
                return <h2>Åpne Prosjekter</h2>;
        }
    }

    hashCode(s) {
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            const code = s.charCodeAt(i);
            hash = ((hash<<5)-hash) + code;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    getCardColor(title) {
        return colors[this.hashCode(title) % colors.length];
    }

    renderProjects() {
        const { path, popoverOpen, popoverContent, popoverAnchor } = this.props;
        const tableMode = path.replace('/projects/', '');
        if (this._projects(tableMode)) {
            return (
                <div className="project-cards">
                    {this._projects(tableMode).map((project, index) => {
                        return (
                            <Card key={index} className="project-card" style={{backgroundColor: this.getCardColor(project.name)}}>
                                <CardTitle
                                    className="project-card-title"
                                    title={project.name}
                                    subtitle={'Laget av:' + project.creatorID + '  ' + 'Sjef: ' + project.managerID}
                                />
                                <CardActions>
                                    <Link to={'project/' + project.ID}>
                                        <FlatButton label='Åpne'/>
                                    </Link>
                                    <FlatButton label="Info" onTouchTap={(event) => {
                                        popoverOpen(true);
                                        popoverContent(project.description);
                                        popoverAnchor(event.currentTarget);
                                    }}/>
                                </CardActions>
                            </Card>
                        );
                    })}
                </div>
            );
        }
        return (
            <CircularProgress/>
        );
    }

    /**
     * Render method
     * @returns {XML}
     */
    render(){
        const { newDialogIsOpen, newDialog, postProjectNew, push } = this.props;

        return (
            <div className="container">
                <ProjectsSideMenu
                    className="projects-sidemenu"
                    handlePrivate={push.bind(null, '/projects/private')}
                    handlePublic={push.bind(null, '/projects')}
                    handleAccessible={push.bind(null, '/projects/accessible')}
                    handleNew={newDialog.bind(null, true)}
                />
                <div>
                    <div className="container">

                        {this.renderProjects()}

                        <Popover component="projects"/>

                        <ProjectNewDialog
                            title="Nytt Prosjekt"
                            open={newDialogIsOpen}
                            handleSubmit={(values, dispatch, props) => {postProjectNew(values, dispatch, props); newDialog(false)}}
                            onRequestClose={newDialog.bind(null, false)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        path: props.location.pathname,
        projectsPublic: state.projectReducer.projectsPublic,
        projectsAccessible: state.projectReducer.projectsAccessible,
        projectsIsCreator: state.projectReducer.projectsIsCreator,
        projectsIsManager: state.projectReducer.projectsIsManager,
        tableMode: state.projectReducer.tableMode,
        newDialogIsOpen: state.dialogReducer.projectNew.isOpen,
        deleteDialogIsOpen: state.dialogReducer.projectDelete.isOpen,
        deleteDialogAction: state.dialogReducer.projectDelete.action,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (url) => dispatch(push(url)),
        clearInitEditProjectForm: () => dispatch(clearInitEditProjectForm()),
        getProjectsPublic: () => dispatch(getProjectsPublic()),
        getProjectsAccessible: () => dispatch(getProjectsAccessible()),
        getProjectsIsCreator: () => dispatch(getProjectsIsCreator()),
        getProjectsIsManager: () => dispatch(getProjectsIsManager()),
        postProjectNew: (data) => dispatch(postProjectNew(data)),
        deleteProject: (project) => dispatch(deleteProject(project)),
        newDialog: (open) => dispatch(dialogOpen('projectNew', open)),
        deleteDialog: (open) => dispatch(dialogOpen('projectDelete', open)),
        deleteDialogChangeAction: (action) => dispatch(dialogChangeAction('projectDelete', action)),
        popoverOpen: (open) => dispatch(popoverOpen('projects', open)),
        popoverAnchor: (anchor) => dispatch(popoverAnchor('projects', anchor)),
        popoverContent: (content) => dispatch(popoverContent('projects', content)),
        popoverAdd: (popover) => dispatch(popoverAdd(popover))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);