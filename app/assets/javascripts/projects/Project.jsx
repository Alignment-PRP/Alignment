import React from 'react';
import {connect} from 'react-redux'
import RequirementListItemMini from '../requirements/presentational/RequirementListItemMini.jsx'



import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { getRequirementsByProjectId } from "../redux/actions/projectActions.jsx";
import { getAllRequirements } from '../redux/actions/requirementActions.jsx';

class Project extends React.Component {

    componentDidMount(){
        this.props.getRequirementsByProjectId(this.props.params.id)
    }

    componentWillMount(){
        this.props.changeSideMenuMode("HIDE")
    }

    renderProjectRequirementList(){

        return this.props.projectRequirements.map((item, index) => {
                return <RequirementListItemMini key={index} requirement={item}/>
            }
        )
    }


    render() {
        return (
            <div className="container">
                <div className="add-requirements">
                    <h1> Krav </h1>

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