import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses, validateUserForm as validate} from './../render';

/**
 * Redux-form for user creation and updating.
 */
class UserForm extends React.Component {

    render() {
        const {handleSubmit, handleClose, classes, pristine, submitting, reset} = this.props;
        return (
            <MuiThemeProvider>
                <div className="form-inner">
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="USERNAME"
                            label="Brukernavn"
                            component={renderTextField}
                        />
                        <Field
                            name="email"
                            label="Epost"
                            component={renderTextField}
                        />
                        <Field
                            name="firstName"
                            label="Fornavn"
                            component={renderTextField}
                        />
                        <Field
                            name="lastName"
                            label="Etternavn"
                            component={renderTextField}
                        />
                        <Field
                            name="pass"
                            label="Passord"
                            component={renderPassField}
                        />
                        <Field
                            name="ucName"
                            label="Brukerklasse"
                            component={renderSelectField}
                        >
                            {menuItemsClasses(classes)}
                        </Field>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                            <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                            <RaisedButton className="form-button" label="Tilbakestill" onClick={reset} disabled={pristine}/>
                            <RaisedButton className="form-button" style={{marginLeft: 'auto'}} secondary={true} label="Avbryt" onClick={handleClose}/>
                        </div>
                    </form>
                </div>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    let initialValues;
    if (state.userFormReducer.user) {
        initialValues = state.userFormReducer.user;
        initialValues.oldUSERNAME = initialValues.USERNAME;
    }
    return {
        initialValues: initialValues
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'UserForm',
    validate,
    enableReinitialize: true
})(UserForm));
