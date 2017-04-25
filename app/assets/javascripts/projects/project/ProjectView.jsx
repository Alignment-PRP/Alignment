import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { changeSideMenuMode } from "./../redux/actions/sideMenuActions";
import {Tabs, Tab} from 'material-ui/Tabs';

//Importing the methods declared in redux/actions. These methodes handles the global state of the app.
//Some of these methods uses axios to get and send data to the DB. (GET/POST requiests).
import { changeSideMenuMode } from "../../redux/actions/sideMenuActions";
import { getRequirementsByProjectId } from "../../redux/actions/projectActions";
import { getAllRequirements } from '../../redux/actions/requirementActions';
import {
    postRequirementToProject, postRequirementToProjectWithFilter,
    deleteRequirementToProject, deleteRequirementToProjectWithFilter
} from '../../redux/actions/projectActions';
import { addFilter, addFiltered } from './../../redux/actions/filterActions';
import { popoverAdd } from './../../redux/actions/popoverActions';



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
        const { index, path, push } = this.props;
        return (
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    value={path}
                >
                    <Tab value="/admin" label="Prosjektoversikt" onActive={() => push('/admin')}>
                        <div id="admin" style={this.style.tabContent}>
                            <h2>Brukeroversikt</h2>
                            <ul>
                                <li>Oversikt over hvem som eier hvilket prosjekt</li>
                            </ul>
                        </div>
                    </Tab>
                    <Tab value="/admin/users" label="Tilgang" onActive={push.bind(null, '/admin/users')}>
                        <div style={this.style.tabContent}>
                            <Users/>
                        </div>
                    </Tab>
                    <Tab value="/admin/users" label="Tilgang" onActive={push.bind(null, '/admin/users')}>
                        <div style={this.style.tabContent}>
                            <Users/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
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
        postRequirementToProjectWithFilter: (projectID, requirement, filter, comp) => {
            dispatch(postRequirementToProjectWithFilter(projectID, requirement, filter, comp))
        },
        deleteRequirementToProject: (projectID, requirement) => {
            dispatch(deleteRequirementToProject(projectID, requirement))
        },
        deleteRequirementToProjectWithFilter: (projectID, requirement, filter, comp) => {
            dispatch(deleteRequirementToProjectWithFilter(projectID, requirement, filter, comp))
        },
        popoverAdd: (popover) => {
            dispatch(popoverAdd(popover));
        }
    };
};

/**
 * This connects this component to Redux so that you can use the Actions and get access to global state.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Project);