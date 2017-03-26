import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'username' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    return errors
};

const renderTextField = ({ input, label, dv, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
);

class EditUserForm extends React.Component {

    constructor(props) {
        super(props);

        this.classChange = this.classChange.bind(this);

        this.state = {
            value: this.props.user.ucName
        }
    }

    classChange(event, value) {
        this.setState({value: value});
    }

    menuItems(classes) {
        return classes.map((item, index) => {
            return <option value={item.NAME}>{item.NAME}</option>
        })
    }

    rrender(handleSubmit, pristine, submitting, user, classes) {
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
                    <Field
                        name="ucName"
                        component="select"
                        onChange={this.classChange}
                    >
                        <option value={this.state.value}>{this.state.value}</option>
                        {this.menuItems(classes.filter(e => e.NAME != this.state.value))}
                    </Field>
                    <br/>
                    <RaisedButton type="submit" label="Submit" disabled={pristine || submitting}/>
                    <RaisedButton label="Endre" disabled={true}/>
                </form>
            </MuiThemeProvider>
        );
    }

    render() {
        const {handleSubmit, pristine, submitting, user, classes} = this.props;
        return this.rrender(handleSubmit, pristine, submitting, user, classes);
    }

}

const mapStateToProps = (state) => {
    return {
        initialValues: state.userFormReducer.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(reduxForm({
    form: 'EditUserForm',
    validate,
})(EditUserForm));
