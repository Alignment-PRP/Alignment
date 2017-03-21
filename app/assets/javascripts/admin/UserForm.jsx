import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
    const errors = {};
    const requiredFields = [ 'username', 'email', 'firstname', 'lastname' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    return errors
};

const renderTextField = ({ input, label, meta: { touched, error }, custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
);

const renderButton = ({input, meta, type, label}) => (
    <RaisedButton type={type} label={label}/>
);

class UserForm extends React.Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Field name="username" component={renderTextField} label="Brukernavn"/>
                <Field name="email" component={renderTextField} label="Epost"/>
                <br/>
                <Field name="firstname" component={renderTextField} label="Fornavn"/>
                <Field name="lastname" component={renderTextField} label="Etternavn"/>
                <br/>
                <Field type="submit" component={renderButton} label="Submit"/>
            </form>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
    }
};

export default reduxForm({
    form: 'UserForm',
    validate
})(UserForm);
