import React from 'react';
import {connect} from 'react-redux'

//Importing the methods declared in redux/actions. These methodes handles the global state of the app.
//Some of these methods uses axios to get and send data to the DB. (GET/POST requiests).
import { changeSideMenuMode } from "../../redux/actions/sideMenuActions";
import { getRequirementsByProjectId } from "../../redux/actions/projectActions";
import { getAllRequirements } from '../../redux/actions/filterActions';
import { postRequirementToProject } from '../../redux/actions/projectActions';
import { deleteRequirementToProject } from '../../redux/actions/projectActions';
import { addFilterComponent } from './../../redux/actions/filterActions';

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
        this.props.addFilterComponent('pro_requirements');
        this.props.changeSideMenuMode("HIDE")
    }

    //TODO see render method
    _filterProjectRequirements(projectRequirements, filter) {
        return projectRequirements.filter(req => {
            if (filter[req.cName]) {
                if (filter[req.cName].length !== 0) {
                    if (filter[req.cName].indexOf(req.scName) !== -1 ) {
                        return true;
                    }
                    return false;
                }
                return true;
            }
        })
    }

    /**
     * Renders the component. This component returns a JSX tag, and all code need to be inside
     * this tag. JSX looks like html but is really a javascript extension syntax. This get compiled
     * into javascript and then into html. CodeAcademy.com Rect.js part 1 explains this in module 1.
     * @returns {XML}
     */
    render() {

        const {
            filter, filterRequirementList, allRequirements, projectRequirements,
            postRequirementToProject, deleteRequirementToProject, params
        } = this.props;

        const allrs = (filter ? Object.keys(filter).length > 0 : false) ? (filterRequirementList ? filterRequirementList : [] ) : allRequirements;

        //TODO fix filtering for projectRequirements
        // const allprs = (filter ? Object.keys(filter).length > 0 : false) ? this._filterProjectRequirements(projectRequirements, filter) : projectRequirements;

        const filteredAll = allrs.filter(
            e => {
                for (let e2 of projectRequirements) {
                    if (e.ID === e2.ID) return false;
                }
                return true;
            });

        const metaDataLeft = {
            table: 'allRequirements',
            objects: filteredAll,
            rowMeta: [
                {label: 'Navn', field: 'name', width: '25%'},
                {label: 'Beskrivelse', wrap: true, field: 'description', width: '60%'},
                {type: 'ADD_ACTION', action: (requirement) => {
                        postRequirementToProject(params.id, requirement);
                }, width: '15%'}
            ]
        };

        const metaDataRight = {
            table: 'projectRequirements',
            objects: projectRequirements,
            rowMeta: [
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
        filter: state.filterReducer.filter['pro_requirements'],
        filterRequirementList: state.filterReducer.filterRequirementList['pro_requirements'],
        allRequirements: state.filterReducer.requirements,
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
        addFilterComponent: (comp) => {
            dispatch(addFilterComponent(comp));
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