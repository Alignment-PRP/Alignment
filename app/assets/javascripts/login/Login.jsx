import React from 'react';
import { connect } from 'react-redux';
import { login } from './../redux/actions/authActions';
import LoginForm from "./LoginForm";

class Login extends React.Component {

    render() {
        const { login } = this.props;

        return (
            <div id="login">
                <LoginForm onSubmit={(values) => {
                    login(values.username, values.password)
                }}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => {
            dispatch(login(username, password));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
