import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses, validateUserFormPass as validate} from './../../render.jsx';

class CreateUserForm extends React.Component {

    render() {
        const {handleSubmit, handleClear, pristine, submitting, classes} = this.props;
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="USERNAME"
                        label="Brukernavn"
                        disabled={false}
                        component={renderTextField}
                    />
                    <Field
                        name="email"
                        label="Epost"
                        disabled={false}
                        component={renderTextField}
                    />
                    <br/>
                    <Field
                        name="firstName"
                        label="Fornavn"
                        disabled={false}
                        component={renderTextField}
                    />
                    <Field
                        name="lastName"
                        label="Etternavn"
                        disabled={false}
                        component={renderTextField}
                    />
                    <br/>
                    <Field
                        name="pass"
                        label="Passord"
                        disabled={false}
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
                    <RaisedButton type="submit" label="Lagre" disabled={pristine || submitting}/>
                    <RaisedButton label="Endre bruker" disabled={true}/>
                    <RaisedButton label="Tilbakestill" disabled={false} onClick={handleClear}/>
                </form>
            </MuiThemeProvider>
        );
    }

}

export default reduxForm({
    form: 'CreateUserForm',
    validate,
})(CreateUserForm);
