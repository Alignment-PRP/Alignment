import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'USERNAME', 'firstName', 'lastName', 'email', 'ucName', 'pass' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ugyldig epost'
    }
    return errors
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
);

const renderPassField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               type="password"
               {...input}
               {...custom}
    />
);

class CreateUserForm extends React.Component {

    menuItems(classes) {
        return classes.map((item, index) => {
            return <option value={item.NAME}>{item.NAME}</option>
        })
    }

    _render(handleSubmit, handleClear, pristine, submitting, classes) {
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
                        component="select"
                    >
                        {this.menuItems(classes)}
                    </Field>
                    <br/>
                    <RaisedButton type="submit" label="Lagre" disabled={pristine || submitting}/>
                    <RaisedButton label="Endre bruker" disabled={true}/>
                    <RaisedButton label="Tilbakestill" disabled={false} onClick={handleClear}/>
                </form>
            </MuiThemeProvider>
        );
    }

    render() {
        const {handleSubmit, handleClear, pristine, submitting, classes} = this.props;
        return this._render(handleSubmit, handleClear, pristine, submitting, classes);
    }

}

export default reduxForm({
    form: 'CreateUserForm',
    validate,
})(CreateUserForm);
