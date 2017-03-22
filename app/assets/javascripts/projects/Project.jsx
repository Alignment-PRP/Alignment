import React from 'react';
import axios from 'axios';
import * as URLS from '../config.jsx'
import {connect} from 'react-redux'


import RequirementListItemMini from '../requirements/presentational/RequirementListItemMini.jsx'
import RequirementListItemMiniAdd from '../requirements/presentational/RequirementListItemMiniAdd.jsx'

import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { getRequirementsByProjectId } from "../redux/actions/projectActions.jsx";
import { getAllRequirements } from '../redux/actions/requirementActions.jsx';

class Project extends React.Component {
    constructor(props){
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentDidMount() {
        this.props.getRequirementsByProjectId(this.props.params.id);
        this.props.getAllRequirements();
    }

    componentWillMount(){
        this.props.changeSideMenuMode("HIDE")
    }


    renderProjectRequirementList(){
        if(this.props.projectRequirements != null){
            return this.props.projectRequirements.map((item, index) => {
                    return <RequirementListItemMini key={index} requirement={item} />
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
        if(this.props.allRequirements != null){
            return this.props.allRequirements.map((item, index) => {
                    return <RequirementListItemMiniAdd key={index} requirement={item} onClickHandler={this.onClickHandler}/>
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

    onClickHandler(r_id){

        axios.post(URLS.PROJECT_REQUIREMENT_POST_ADD, { projectid: parseInt(this.props.params.id), requirementid: parseInt(r_id) })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log("ProjectID and ReqId", this.props.params.id, r_id);
    }



    render() {
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