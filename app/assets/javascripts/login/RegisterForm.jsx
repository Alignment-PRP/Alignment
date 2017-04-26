/**
 * Redux-form for user creation and updating.
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderPassField, validateRegisterForm as validate} from './../core/render';
import {Paper, RaisedButton} from "material-ui";

class RegisterForm extends React.Component {

    render() {
        const { handleSubmit, pristine, submitting, handleBackButton, registerFailed } = this.props;
        return (
            <MuiThemeProvider>
                <Paper id="loginForm">
                    <h2>Ny Bruker</h2>
                    {registerFailed ?
                        <div id="loginFailed">Brukernavnet eksisterer</div>
                        : null}
                    <form onSubmit={handleSubmit}>
                        <div id="loginFields">
                            <Field
                                name="USERNAME"
                                label="Brukernavn"
                                component={renderTextField}
                                required
                            />
                            <Field
                                name="email"
                                label="Epost"
                                component={renderTextField}
                                required
                            />
                            <Field
                                name="firstName"
                                label="Fornavn"
                                component={renderTextField}
                                required
                            />
                            <Field
                                name="lastName"
                                label="Etternavn"
                                component={renderTextField}
                                required
                            />
                            <Field
                                name="pass"
                                label="Passord"
                                component={renderPassField}
                                required
                            />
                            <Field
                                name="pass_rep"
                                label="Gjenta Passord"
                                component={renderPassField}
                                required
                            />
                        </div>
                        <div id="loginButtons">
                            <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                            <RaisedButton className="form-button" secondary={true} label="Tilbake" onTouchTap={handleBackButton}/>
                        </div>
                        </form>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        registerFailed: state.loginPageReducer.registerFailed
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'Register',
    validate
})(RegisterForm));