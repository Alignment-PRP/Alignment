import React from 'react';
import {connect} from 'react-redux'

//Importing the methods declared in redux/actions. These methodes handles the global state of the app.
//Some of these methods uses axios to get and send data to the DB. (GET/POST requiests).
import { changeSideMenuMode } from "../../redux/actions/sideMenuActions";
import { getRequirementsByProjectId } from "../../redux/actions/projectActions";
import { getAllRequirements } from '../../redux/actions/requirementActions';
import { postRequirementToProject } from '../../redux/actions/projectActions';
import { deleteRequirementToProject } from '../../redux/actions/projectActions';
import { addFilter, addFiltered } from './../../redux/actions/filterActions';

import Filter from './Filter';
import Paper from 'material-ui/Paper';
import GenericTable from './../../core/table/GenericTable';



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
        this.props.changeSideMenuMode("HIDE")
    }

    _filterAll(filter, allRequirements_filtered, allRequirements, projectRequirements) {
        if ((filter ? Object.keys(filter).length > 0 : false)) {
            if (allRequirements_filtered) {
                return Object.keys(allRequirements_filtered)
                    .filter(key => { if (projectRequirements[key]) return false; else return true })
                    .map(key => allRequirements_filtered[key])
            } else {
                return [];
            }
        } else {
            return allRequirements;
        }
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
            allRequirements, projectRequirements,
            postRequirementToProject, deleteRequirementToProject, params
        } = this.props;

        const metaDataLeft = {
            table: 'allRequirements',
            data: this._filterAll(filter, allRequirements_filtered, allRequirements, projectRequirements),
            columns: [
                {label: 'Navn', field: 'name', width: '25%'},
                {label: 'Beskrivelse', wrap: true, field: 'description', width: '60%'},
                {type: 'ADD_ACTION', action: (requirement) => {
                    postRequirementToProject(params.id, requirement);
                }, width: '15%'}
            ]
        };

        const metaDataRight = {
            table: 'projectRequirements',
            data: (filter ? Object.keys(filter).length > 0 : false) ? projectRequirements_filtered : projectRequirements,
            columns: [
                {label: 'Navn', field: 'name', width: '25%'},
                {label: 'Beskrivelse', wrap: true, field: 'description', width: '60%'},
                {type: 'DELETE_ACTION', action: (requirement) => {
                    deleteRequirementToProject(params.id, requirement);
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
                    <h2>Legg til Krav</h2>
                    <GenericTable metaData={metaDataLeft} />
                </div>
                <div className="project-requirements">
                    <h2>Prosjekt Krav</h2>
                    <GenericTable metaData={metaDataRight}/>
                </div>
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
        projectRequirements: state.projectReducer.projectRequirements
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
            dispatch(getAllRequirements())
        },
        getRequirementsByProjectId: (id) => {
            dispatch(getRequirementsByProjectId(id))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
        postRequirementToProject: (projectID, requirement) => {
            dispatch(postRequirementToProject(projectID, requirement))
        },
        deleteRequirementToProject: (projectID, requirement) => {
            dispatch(deleteRequirementToProject(projectID, requirement))
        }
    };
};

/**
 * This connects this component to Redux so that you can use the Actions and get access to global state.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Project);