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
        return this.props.filterRequirementList.map((item, index) => {
            return <RequirementListItemCheckbox key={index}
                                                Name={item.name}
                                                isPublic={item.ispublic}
                                                Description={item.description}
                                                Source={item.source}
                                                Stimulus={item.stimulus}
                                                Artifact={item.artifact}
                                                Environment={item.environment}
                                                Response={item.response}
                                                ResponseMeasure={item.responsemeasure}
                                                Category={item.cname}
                                                CategoryDescription={item.cdesc}/>
            }
        )
    }


    render() {
        return (
            <div className="all-requirements-list">
                <h1>Alle Krav</h1>
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
        filterRequirementList: state.requirementReducer.filterRequirementList
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
