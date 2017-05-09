/**
 * Redux-form for user creation and updating.
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses, validateUserForm as validate} from './../../core/render';
import HelpToolTip from './../../core/HelpToolTip';
import {FlatButton} from "material-ui";

class UserForm extends React.Component {

    render() {
        const {handleSubmit, handleClose, classes, pristine, submitting, reset} = this.props;
        return (
            <div className="form-inner">
                <form onSubmit={handleSubmit}>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="USERNAME"
                                label="Brukernavn"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Ønsket brukernavn, unik identifikator for brukeren."/>
                        </div>
                        <div className="tool-tip-container">
                            <Field
                                name="email"
                                label="E-post"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="E-post for denne brukeren."/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="firstName"
                                label="Fornavn"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Fornavn på brukeren."/>
                        </div>
                        <div className="tool-tip-container">
                            <Field
                                name="lastName"
                                label="Etternavn"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Etternavn på brukeren."/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="pass"
                                label="Passord"
                                component={renderPassField}
                            />
                            <HelpToolTip toolTip="Passord, selvvalgt"/>
                        </div>
                        <div className="tool-tip-container">
                            <Field
                                name="ucName"
                                floatingLabelText="Brukerklasse"
                                component={renderSelectField}
                            >
                                {menuItemsClasses(classes)}
                            </Field>
                            <HelpToolTip toolTip="Velg en brukerklasse for denne brukeren."/>
                        </div>
                    </div>
                    <div className="form-button-row">
                        <FlatButton secondary={true}
                                    label="Tilbakestill"
                                    onClick={reset}
                                    disabled={pristine}
                                    style={{margin: '8px 8px 8px 8px'}}
                        />
                        <FlatButton secondary={true}
                                    label="Avbryt"
                                    style={{margin: '8px 0 8px auto'}}
                                    onClick={handleClose}
                        />
                        <RaisedButton primary={true}
                                      type="submit"
                                      label="Lagre"
                                      disabled={pristine || submitting}
                                      style={{margin: '8px 8px 8px 8px'}}
                        />
                    </div>
                </form>
            </div>
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