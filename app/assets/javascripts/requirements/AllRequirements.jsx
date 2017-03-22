import React from 'react';
import {connect} from "react-redux";
import RequirementListItemCheckbox from './presentational/RequirementListItemCheckbox.jsx';
import { getAllRequirements } from "../redux/actions/requirementActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class AllRequirements extends React.Component {

    componentDidMount(){
        this.props.getAllRequirements();
        this.props.changeSideMenuMode("FILTER");
    }

    generateRequirementList(){
        let renderRequirement = [];
        if(this.props.filter.length == 0){
            renderRequirement = this.props.requirements;
        }else{
            renderRequirement = this.props.filterRequirementList;
        }
        return renderRequirement.map((item, index) => {
            return <RequirementListItemCheckbox key={index} requirement={item}/>
            }
        )
    }


    render() {
        return (
            <div className="all-requirements-list">
                <h2>Alle Krav</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Beskrivelse</th>
                        <th>Source</th>
                        <th>Stimulus</th>
                        <th>Artifact</th>
                        <th>Responce</th>
                        <th>ResponceMeasure</th>
                        <th>Environment</th>
                        <th>Category</th>
                        <th>CategoryDescription</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.generateRequirementList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterRequirementList: state.requirementReducer.filterRequirementList,
        requirements: state.requirementReducer.requirements,
        filter: state.requirementReducer.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRequirements: () => {
            dispatch(getAllRequirements())
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirements);
