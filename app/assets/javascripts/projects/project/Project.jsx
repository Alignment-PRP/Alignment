import React from 'react';
import {connect} from 'react-redux'

//Importing the methods declared in redux/actions. These methodes handles the global state of the app.
//Some of these methods uses axios to get and send data to the DB. (GET/POST requiests).
import { changeSideMenuMode } from "../../redux/actions/sideMenuActions";
import { getRequirementsByProjectId } from "../../redux/actions/projectActions";
import { getAllRequirements, postProjectReqUpdate, updateRequirementMetadata } from '../../redux/actions/requirementActions';
import {
    postRequirementToProject, postRequirementToProjectWithFilter,
    deleteRequirementToProject, deleteRequirementToProjectWithFilter
} from '../../redux/actions/projectActions';
import { dialogOpen } from '../../redux/actions/dialogActions';
import { addFilter, addFiltered } from './../../redux/actions/filterActions';
import { popoverAdd } from './../../redux/actions/popoverActions';
import ProjectReqUpdateDialog from '../dialog/ProjectReqUpdateDialog';
import Filter from './Filter';
import Paper from 'material-ui/Paper';
import DataTable from '../../core/table/DataTable';
import Popover from './../../core/popover/Popover';
import Ellipsis from './../../core/popover/Ellipsis';



class Project extends React.Component {

    /**
     * This is a lifecycle method that runs after the render function. It is good practis to call
     * on GET methods here because we want to render the component first, THEN fill it with
     * information from DB.
     */
    componentDidMount() {
        //react-routes make us able to get the id of the URL with: this.props.params.id
        this.props.getRequirementsByProjectId(this.props.params.id);
        this.props.getAllRequirements();
    }

    /**
     * This gets called before render, methods that the render component dont depend on can get
     * called here. ChangeSideMenuMode changes the stats of the sidemenu. The sidemenu
     * automatically rerenders when this gets called.
     */
    componentWillMount(){
        this.props.addFilter('project');
        this.props.addFiltered('allRequirements');
        this.props.addFiltered('projectRequirements');
        this.props.popoverAdd('project');
        this.props.changeSideMenuMode("HIDE")
    }

    intersectRequirements(allreq, proreq) {
        if (allreq && proreq) {
            return Object.keys(allreq)
                .filter(key => { if (proreq[key]) return false; else return true })
                .map(key => allreq[key])
        } else {
            return null;
        }
    }

    _filterAll(filter, allreq_f, allreq, proreq_f, proreq) {
        if ((filter ? Object.keys(filter).length > 0 : false)) {
            return this.intersectRequirements(allreq_f, proreq_f);
        }
        return this.intersectRequirements(allreq, proreq);
    }

    /**
     * Renders the component. This component returns a JSX tag, and all code need to be inside
     * this tag. JSX looks like html but is really a javascript extension syntax. This get compiled
     * into javascript and then into html. CodeAcademy.com Rect.js part 1 explains this in module 1.
     * @returns {XML}
     */
    render() {

        const {
            filter,
            allRequirements_filtered, projectRequirements_filtered,
            allRequirements, projectRequirements, projectReqUpdateDialog, postProjectReqUpdate, updateRequirementMetadata,
            projectReqUpdateDialogIsOpen, postRequirementToProject, postRequirementToProjectWithFilter,
            deleteRequirementToProject, deleteRequirementToProjectWithFilter, params
        } = this.props;

        const configLeft = {
            table: 'allRequirements',
            data: this._filterAll(filter, allRequirements_filtered, allRequirements, projectRequirements_filtered, projectRequirements),
            columns: [
                {label: 'Navn', property: 'name', width: '25%'},
                {label: 'Beskrivelse', property: 'description', width: '60%', wrap: {
                        lines: 4,
                        ellipsis: (requirement) => {
                            const props = {
                                component: 'project',
                                object: requirement,
                                property: 'description'
                            };
                            return <Ellipsis {...props} />;
                        }
                    }
                },
                {type: 'ADD_ACTION', action: (requirement) => {
                        if (filter && Object.keys(filter).length > 0) {
                            postRequirementToProjectWithFilter(params.id, requirement, 'project', 'projectRequirements');
                        } else {
                            postRequirementToProject(params.id, requirement);
                        }
                }, width: '15%'}
            ]
        };

        const configRight = {
            table: 'projectRequirements',
            data: (filter ? Object.keys(filter).length > 0 : false) ? projectRequirements_filtered : projectRequirements,
            columns: [
                {label: 'Navn', property: 'name', width: '25%'},
                {label: 'Beskrivelse', property: 'description', width: '60%', wrap: {
                        lines: 4,
                        ellipsis: (requirement) => {
                            const props = {
                                component: 'project',
                                object: requirement,
                                property: 'description'
                            };
                            return <Ellipsis {...props} />;
                        }
                    }
                },
                {type: 'EDIT_ACTION', action: (requirement) => {
                    projectReqUpdateDialog(true);
                    updateRequirementMetadata(requirement);
                },width: '15%'},
                {type: 'DELETE_ACTION', action: (requirement) => {
                    if (filter && Object.keys(filter).length > 0) {
                        deleteRequirementToProjectWithFilter(params.id, requirement, 'project', 'projectRequirements');
                    } else {
                        deleteRequirementToProject(params.id, requirement);
                    }
                }, width: '15%'}
            ]
        };

        return (
            <div className="container">
                <div style={{display: 'flex'}}>
                    <Paper>
                        <Filter/>
                    </Paper>
                </div>
                <div className="add-requirements">
                    <h2>Velg Krav</h2>
                    <DataTable config={configLeft} />
                </div>
                <div className="project-requirements">
                    <h2>Kravliste for Prosjekt</h2>
                    <DataTable config={configRight}/>
                </div>

                <ProjectReqUpdateDialog
                    title="Tilleggsbeskrivelse av krav"
                    open={projectReqUpdateDialogIsOpen}
                    handleSubmit={(data) => {postProjectReqUpdate(data); projectReqUpdateDialog(false)}}
                    onRequestClose={projectReqUpdateDialog.bind(null, false)}
                />

                <Popover component="project"/>
            </div>
        )
    }
}

/**
 * This maps the state from the reducer to the props in this component so that you can use the data
 * as if it where this components state.
 * @param state
 * @returns {{allRequirements: (*|Array), projectRequirements: (*|Array)}}
 */
const mapStateToProps = (state) => {
    return {
        filter: state.filterReducer.filters['project'],
        allRequirements_filtered: state.filterReducer.filterRequirementList['allRequirements'],
        projectRequirements_filtered: state.filterReducer.filterRequirementList['projectRequirements'],
        allRequirements: state.requirementReducer.requirements,
        projectRequirements: state.projectReducer.projectRequirements,
        projectReqUpdateDialogIsOpen: state.dialogReducer.projectReqUpdate.isOpen
    };
};

/**
 * This maps the actions you need from redux/actions to props of this component
 * @param dispatch
 * @returns {{getAllRequirements: (function()), getRequirementsByProjectId: (function(*=)), changeSideMenuMode: (function(*=)), postRequirementToProject: (function(*=)), deleteRequirementToProject: (function(*=))}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        addFilter: (filter) => {
            dispatch(addFilter(filter));
        },
        addFiltered: (comp) => {
            dispatch(addFiltered(comp));
        },
        getAllRequirements: () => {
            dispatch(getAllRequirements());
        },
        getRequirementsByProjectId: (id) => {
            dispatch(getRequirementsByProjectId(id));
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode));
        },
        postRequirementToProject: (projectID, requirement) => {
            dispatch(postRequirementToProject(projectID, requirement));
        },
        updateRequirementMetadata: (requirement) => {
            dispatch(updateRequirementMetadata(requirement))
        },
        postProjectReqUpdate: (data) => {
            dispatch(postProjectReqUpdate(data));
        },
        postRequirementToProjectWithFilter: (projectID, requirement, filter, comp) => {
            dispatch(postRequirementToProjectWithFilter(projectID, requirement, filter, comp));
        },
        deleteRequirementToProject: (projectID, requirement) => {
            dispatch(deleteRequirementToProject(projectID, requirement));
        },
        deleteRequirementToProjectWithFilter: (projectID, requirement, filter, comp) => {
            dispatch(deleteRequirementToProjectWithFilter(projectID, requirement, filter, comp));
        },
        popoverAdd: (popover) => {
            dispatch(popoverAdd(popover));
        },
        projectReqUpdateDialog: (open) => {
            dispatch(dialogOpen('projectReqUpdate', open));
        },
    };
};

/**
 * This connects this component to Redux so that you can use the Actions and get access to global state.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Project);