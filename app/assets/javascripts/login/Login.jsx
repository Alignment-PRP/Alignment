import React from 'react';
import { connect } from 'react-redux';
import { login, register, authClear, loginClear, registerClear } from './../redux/actions/authActions';
import { registerOpen } from './../redux/actions/loginPageActions';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Snack from './../core/Snack';

class Login extends React.Component {

    componentWillMount() {
        //this.props.authClear();
    }

    render() {
        const { login, registerIsOpen, registerOpen, register, loginClear, registerClear } = this.props;

        return (
            <div className="loginCon">
                <div id="login">
                    {registerIsOpen ?
                        <RegisterForm
                            onSubmit={(values) => {
                                register(values);
                            }}
                            handleBackButton={() => {
                                loginClear();
                                registerOpen(false);
                            }}
                        />
                        :
                        <LoginForm
                            onSubmit={(values) => {
                                login(values)
                            }}
                            handleRegisterButton={() => {
                                registerClear();
                                registerOpen(true);
                            }}
                        />
                    }


                </div>
                <footer id="loginFooter">
                    <img className="logo" src="assets/images/play.png"/>

                    <img className="logo" id="reactLogo" src="assets/images/react.svg"/>
                    <img className="logo" src="assets/images/redux.png"/>
                </footer>
                <Snack/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        registerIsOpen: state.loginPageReducer.register
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user)),
        registerOpen: (boolean) => dispatch(registerOpen(boolean)),
        register: (user) => dispatch(register(user)),
        authClear: () => dispatch(authClear()),
        loginClear: () => dispatch(loginClear()),
        registerClear: () => dispatch(registerClear()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);