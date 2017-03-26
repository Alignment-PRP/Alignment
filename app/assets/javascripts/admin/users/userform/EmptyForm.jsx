import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderPassField, renderSelectField} from './../../render.jsx';

class EmptyForm extends React.Component {

    render() {
        const {handleSubmit, handleCreate} = this.props;
        return(
            <MuiThemeProvider>
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
                    <br/>
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
                    <br/>
                    <RaisedButton type="submit" label="Lagre" disabled={true}/>
                    <RaisedButton label="Lag bruker" disabled={false} onClick={handleCreate}/>
                </form>
            </MuiThemeProvider>
        );
    }

}

export default reduxForm({
    form: 'EmptyForm',
})(EmptyForm);
