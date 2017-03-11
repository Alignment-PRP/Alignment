import React from 'react';
import {connect} from "react-redux";
import { setName } from "../redux/actions/userActions.jsx";
import { getAllRequirements } from "../redux/actions/requirementActions.jsx";

class ReduxTests extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Testing some redux state updates</h1>
                <p>My name is {this.props.user.name}</p>
                <p>MY requirements is {console.log(this.props.requirements)} </p>
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
        requirements: state.requirementReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        },
        getAllRequirements: () =>{
            dispatch(getAllRequirements());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTests);