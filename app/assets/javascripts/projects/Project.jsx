import React from 'react';
import axios from 'axios';
import * as URLS from '../config.jsx';
import {connect} from 'react-redux'
import RequirementListItemMini from '../requirements/presentational/RequirementListItemMini.jsx'

import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { getRequirementsByProjectId } from "../redux/actions/projectActions.jsx";
import { getAllRequirements } from '../redux/actions/requirementActions.jsx';

class Project extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            projectRequirements: null,
            allRequirements: null,
            newRequirementList: []

        }
    }

    componentDidMount() {
        axios.get(URLS.PROJECT_REQUIREMENTS_GET_BY_ID + this.props.params.id)
            .then(response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                });

                this.setState({
                    projectRequirements: data
                });

            });

        axios.get(URLS.REQUIREMENTS_GET)
            .then(response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                });

                this.setState({
                    allRequirements: data
                });

            });
    }

    componentWillMount(){
        this.props.changeSideMenuMode("HIDE")
    }

    setNewRequirementList(){
        let allRequirements = null;
        let projectRequiremetns = null;

        if(this.state.allRequirements != null){
            allRequirements = [].concat(this.state.allRequirements);
        }
        if(this.state.projectRequirements != null){
            projectRequiremetns = [].concat(this.state.projectRequirements);
        }

    }

    renderProjectRequirementList(){
        this.setNewRequirementList();
        if(this.state.projectRequirements != null){
            return this.state.projectRequirements.map((item, index) => {
                    return <RequirementListItemMini key={index} requirement={item}/>
                }
            )
        }else{
            return (
                    <tr>
                        <td>Henter prosjekt kravliste...</td>
                    </tr>
                )
        }
    }

    renderAllRequirementList(){
        if(this.state.allRequirements != null){
            return this.state.allRequirements.map((item, index) => {
                    return <RequirementListItemMini key={index} requirement={item}/>
                }
            )
        }else{
            return (
                <tr>
                    <td>Henter kravliste...</td>
                </tr>
            )
        }
    }


    render() {
        console.log("krav", this.state.allRequirements);
        console.log("p_krav", this.state.projectRequirements);
        console.log("new_krav", this.state.newRequirementList);

        return (
            <div className="container">
                <div className="add-requirements">
                    <h1>Legg til Krav</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Beskrivelse</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderAllRequirementList()}
                        </tbody>
                    </table>
                </div>
                <div className="project-requirements">
                    <h1>Prosjekt Krav</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Beskrivelse</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderProjectRequirementList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allRequirements: state.requirementReducer.requirements,
        projectRequirements: state.projectReducer.projectRequirements
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRequirements: () => {
            dispatch(getAllRequirements())
        },
        getRequirementsByProjectId: (id) => {
            dispatch(getRequirementsByProjectId(id))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);