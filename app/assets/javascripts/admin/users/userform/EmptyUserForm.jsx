import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {renderTextField, renderPassField, renderSelectField} from './../../render.jsx';

/**
 * Redux-form for displaying an empty form with user related fields.
 */
class EmptyUserForm extends React.Component {

    render() {
        const {handleSubmit, handleCreate} = this.props;
        return(
            <MuiThemeProvider>
                <Paper className="form-inner">
                    <h2>Bruker</h2>
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="USERNAME"
                            label="Brukernavn"
                            disabled={true}
                            component={renderTextField}
                        />
                        <Field
                            name="email"
                            label="Epost"
                            disabled={true}
                            component={renderTextField}
                        />
                        <Field
                            name="firstName"
                            label="Fornavn"
                            disabled={true}
                            component={renderTextField}
                        />
                        <Field
                            name="lastName"
                            label="Etternavn"
                            disabled={true}
                            component={renderTextField}
                        />
                        <Field
                            name="ucName"
                            label="Brukerklasse"
                            disabled={true}
                            component={renderSelectField}
                        />
                        <RaisedButton className="form-button" type="submit" label="Lagre" disabled={true}/>
                        <RaisedButton className="form-button" secondary={true} label="Lag bruker" disabled={false} onClick={handleCreate}/>
                        <RaisedButton className="form-button" label="Tilbakestill" disabled={true}/>
                    </form>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

export default reduxForm({
    form: 'EmptyUserForm',
})(EmptyUserForm);
