import React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EditUserForm extends React.Component {

    rrender(handleSubmit, user) {
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        defaultValue={user.USERNAME}
                        floatingLabelText="Brukernavn"
                        disabled={false}
                        component={TextField}
                    />
                    <Field
                        name="email"
                        defaultValue={user.email}
                        floatingLabelText="Epost"
                        disabled={false}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        name="firstname"
                        defaultValue={user.firstName}
                        floatingLabelText="Fornavn"
                        disabled={false}
                        component={TextField}
                    />
                    <Field
                        name="lastname"
                        defaultValue={user.lastName}
                        floatingLabelText="Etternavn"
                        disabled={false}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        disabled={false}
                        type="submit"
                        label="Submit"
                        component={RaisedButton}
                    />
                    <Field
                        disabled={true}
                        type="edit"
                        label="Endre"
                        component={RaisedButton}
                    />
                </form>
            </MuiThemeProvider>
        );
    }

    render() {
        const {handleSubmit, user} = this.props;
        return this.rrender(handleSubmit, user);
    }

}
