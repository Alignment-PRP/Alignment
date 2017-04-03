import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses, validateUserFormPass as validate} from '../../../core/render.jsx';

/**
 * Redux-form form for creating users.
 */
class CreateUserForm extends React.Component {

    render() {
        const {handleSubmit, handleClear, pristine, submitting, classes} = this.props;
        return (
            <MuiThemeProvider>
                <Paper className="form-inner">
                    <h2>Lag bruker</h2>
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
                        <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                        <RaisedButton className="form-button" label="Endre bruker" disabled={true}/>
                        <RaisedButton className="form-button" label="Tilbakestill" disabled={false} onClick={handleClear}/>
                    </form>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

export default reduxForm({
    form: 'CreateUserForm',
    validate,
})(CreateUserForm);
