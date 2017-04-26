import React from 'react';
import { connect } from 'react-redux';
import { login } from './../redux/actions/authActions';
import RegisterForm from "./RegisterForm";

class Login extends React.Component {

    render() {
        const { login } = this.props;

        return (
            <div id="login">
                <RegisterForm onSubmit={() => console.log("registrert")}/>
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
        register: (user) => {
            dispatch(register(user));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
