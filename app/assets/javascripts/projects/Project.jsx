import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import RequirementListItemMini from '../requirements/presentational/RequirementListItemMini.jsx'



import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { getRequirementsByProjectId } from "../redux/actions/projectActions.jsx";
import { getAllRequirements } from '../redux/actions/requirementActions.jsx';

class Project extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            projectRequirements: [],
            allRequirements: []

        }
    }

    componentDidMount() {
        axios.get('http://localhost:9000/all-projectrequirements?id=' + this.props.params.id)
            .then(response => {
                const data = [];
                response.data.map((object) => {
                    data.push(object);
                });

                this.setState({
                    projectRequirements: data
                });

            });

        axios.get('http://localhost:9000/requirements/all ')
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

    renderProjectRequirementList(){
        return this.state.projectRequirements.map((item, index) => {
                return <RequirementListItemMini key={index} requirement={item}/>
            }
        )
    }

    renderAllRequirementList(){
        return this.state.allRequirements.map((item, index) => {
                return <RequirementListItemMini key={index} requirement={item}/>
            }
        )
    }


    render() {
        console.log("krav", this.state.allRequirements);
        console.log("p_krav", this.state.projectRequirements);

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