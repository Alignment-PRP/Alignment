import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { renderTextField, renderPassField } from '../core/render';
import {CircularProgress, FontIcon, Paper, RaisedButton} from "material-ui";
import {amber500, lightGreen500, lime600} from "material-ui/styles/colors";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.renderFeedBack = this.renderFeedBack.bind(this);
    }

    renderFeedBack() {
        const { login, authorized, register } = this.props;

        if (register.received && !login.error) {
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '8px'}}>
                    <FontIcon className="material-icons" color={lightGreen500}>done</FontIcon>
                    <span style={{margin: '8px', color: '#8BC34A'}}>Bruker registrert</span>
                </div>
            );
        } else if (login.error) {
            return (
                <div id="loginFailed">Feil brukernavn eller passord</div>
            );
        } else if (login.received && authorized.sent) {
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress size={25}/>
                    <span style={{margin: '8px', color: lime600}}>Autentiserer...</span>
                </div>
            );
        } else if (login.sent && !authorized.sent) {
            return (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress size={25}/>
                    <span style={{margin: '8px', color: amber500}}>Logger inn..</span>
                </div>
            );
        }
        return null;
    }

    render() {
        const { handleSubmit, pristine, submitting, handleRegisterButton } = this.props;

        return (
            <Paper id="loginForm">
                <img id="login-logo" src="assets/images/alignment.png" style={{marginBottom: '12px'}}/>
                <form style={{display: 'flex', flexFlow: 'column'}} onSubmit={handleSubmit}>
                    {this.renderFeedBack()}
                    <div id="loginFields">
                        <Field
                            className="loginField"
                            name="USERNAME"
                            label="Brukernavn"
                            component={renderTextField}
                            required
                        />
                        <Field
                            className="loginField"
                            name="pass"
                            label="Passord"
                            component={renderPassField}
                            required
                        />
                    </div>
                    <div id="loginButtons">
                        <RaisedButton
                            id="loginSubmit"
                            primary={true}
                            type="submit"
                            label="Login"
                            disabled={pristine || submitting}
                        />
                        <RaisedButton
                            id="loginNew"
                            secondary={true}
                            label="Ny Bruker"
                            onTouchTap={handleRegisterButton}
                        />
                    </div>
                </form>
            </Paper>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        login: state.authReducer.login,
        authorized: state.authReducer.authorized,
        register: state.authReducer.register
    }
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'Login'
})(LoginForm));