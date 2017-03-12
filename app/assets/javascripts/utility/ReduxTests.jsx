import React from 'react';
import {connect} from "react-redux";
import { setName } from "../redux/actions/userActions.jsx";
import { getAllRequirements } from "../redux/actions/requirementActions.jsx";
import RequirementListItem from '../requirements/presentational/RequirementListItem.jsx';

class ReduxTests extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getAllRequirements();
    }

    generateRequirementList() {
        return this.props.requirements.map((item, index) => {
                return <RequirementListItem key={index} Name={item.name} isPublic={item.ispublic}
                                            Description={item.description} Source={item.source} Stimulus={item.stimulus}
                                            Artifact={item.artifact} Environment={item.environment} Response={item.response}
                                            ResponseMeasure={item.responsemeasure}
                                            Category={item.cname} CategoryDescription={item.cdesc}/>
            }
        )
    }


    render() {
        return (
            <div>
                <h1>Testing some redux state updates</h1>
                <p>My name is {this.props.user.name}</p>
                {this.generateRequirementList()}
                <button onClick={() => this.props.setName('Max')}>Change the Username</button>
                <button onClick={() => this.props.setName('Glenn')}>Change the Username</button>
                <button onClick={() => this.props.getAllRequirements()}>Get all Requirements</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        requirements: state.requirementReducer.requirements
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name))
        },
        getAllRequirements: () => {
            dispatch(getAllRequirements())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTests);