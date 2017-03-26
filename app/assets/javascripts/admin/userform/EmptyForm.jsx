import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'username', 'email', 'firstname', 'lastname', 'ucName' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    return errors
};

class EmptyForm extends React.Component {

    _render(handleSubmit, handleCreate) {
        return(
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        hintText="Brukernavn"
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="email"
                        hintText="Epost"
                        disabled={true}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        name="firstname"
                        hintText="Fornavn"
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="lastname"
                        hintText="Etternavn"
                        disabled={true}
                        component={TextField}
                    />
                    <Field
                        name="ucName"
                        component="select"
                        disabled={true}
                    >
                        <option>Brukerklasse</option>
                    </Field>
                    <br/>
                    <RaisedButton type="submit" label="Lagre" disabled={true}/>
                    <RaisedButton label="Lag bruker" disabled={false} onClick={handleCreate}/>
                </form>
            </MuiThemeProvider>
        );
    }

    render() {
        const {handleSubmit, handleCreate} = this.props;
        return this._render(handleSubmit, handleCreate);
    }

}

export default reduxForm({
    form: 'EmptyForm',
    validate,
})(EmptyForm);
