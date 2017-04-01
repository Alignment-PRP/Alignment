import React from 'react';
import {connect} from "react-redux";
import RequirementListItem from './presentational/RequirementListItem.jsx';
import { getAllRequirements, getAllCategoryNames, deleteRequirement } from "../redux/actions/requirementActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class AllRequirements extends React.Component {

    componentDidMount(){
        this.props.getAllRequirements();
        this.props.getAllCategoryNames();
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
            return <RequirementListItem deleteRequirement={this.props.deleteRequirement} key={index} requirement={item}/>
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
                        <th>Kommentar</th>
                        <th>Category</th>
                        <th>Sub Category</th>
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
        },
        getAllCategoryNames: () => {
            dispatch(getAllCategoryNames())
        },
        deleteRequirement: (id) => {
            dispatch(deleteRequirement(id))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirements);
