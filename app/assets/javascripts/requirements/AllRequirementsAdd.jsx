import React from 'react';
import {connect} from "react-redux";
import RequirementListItemMini from './presentational/RequirementListItemMini.jsx';
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
            return <RequirementListItemMini key={index} requirement={item}/>
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
                        <th>Category</th>
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
