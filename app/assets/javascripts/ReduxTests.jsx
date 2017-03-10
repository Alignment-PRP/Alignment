import React from 'react';
import {connect} from "react-redux";
import { setName } from "./actions/userActions.jsx";

class ReduxTests extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Testing some redux state updates</h1>
                <p>My name is {this.props.user.name}</p>
                <button onClick={() => this.props.setName('Max')}>Change the Username</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        math: state.math
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTests);