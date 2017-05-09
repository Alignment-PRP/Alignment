import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses, validateUserForm as validate} from './../../core/render';

/**
 * Redux-form for user creation and updating.
 */
class UserForm extends React.Component {

    render() {
        const {handleSubmit, handleClose, classes, pristine, submitting, reset} = this.props;
        return (
            <div className="form-inner">
                <form onSubmit={handleSubmit}>
                    <div className="form-field-row">
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
                    </div>
                    <div className="form-field-row">
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
                    </div>
                    <div className="form-field-row">
                        <Field
                            name="pass"
                            label="Passord"
                            component={renderPassField}
                        />
                        <Field
                            name="ucName"
                            floatingLabelText="Brukerklasse"
                            component={renderSelectField}
                        >
                            {menuItemsClasses(classes)}
                        </Field>
                    </div>
                    <div className="form-button-row">
                        <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                        <RaisedButton className="form-button" label="Tilbakestill" onClick={reset} disabled={pristine}/>
                        <RaisedButton className="form-button" style={{marginLeft: 'auto'}} secondary={true} label="Avbryt" onClick={handleClose}/>
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