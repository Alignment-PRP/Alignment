import React from 'react';
import { connect } from 'react-redux';
import RequirementListItem from './presentational/RequirementListItem.jsx';
import { getRequirementsByProjectId } from '../redux/actions/requirementActions.jsx';

class ProjectRequirements extends React.Component {

    componentDidMount() {
        this.props.getRequirementsByProjectId(this.props.id);
    }

    generateRequirementList(){
        console.log(this.props.projectRequirements);
        return this.props.projectRequirements.map((item, index) => {
            return <RequirementListItem key={index} Name={item.name} isPublic={item.ispublic} Description={item.description} Source={item.source}  Stimulus={item.stimulus}
                                    Artifact={item.artifact} Environment={item.environment} Response={item.response} ResponseMeasure={item.responsemeasure}
                                    Category={item.cname} CategoryDescription={item.cdesc}/> }
        )
    }

    render() {
        return (
            <div>
                <h1>Prosjekt Krav</h1>
                <ul>
                    {this.generateRequirementList()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projectRequirements: state.requirementReducer.projectRequirements
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRequirementsByProjectId: (id) => {
            dispatch(getRequirementsByProjectId(id))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRequirements);