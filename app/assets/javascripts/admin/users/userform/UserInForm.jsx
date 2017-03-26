import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses} from './../../render.jsx';

class UserInForm extends React.Component {

    render() {
        const {handleSubmit, handleEdit, handleClear, classes} = this.props;
        return (
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
                    <br/>
                    <Field
                        name="ucName"
                        label="Brukerklasse"
                        disabled={true}
                        component={renderSelectField}
                    >
                        {menuItemsClasses(classes)}
                    </Field>
                    <br/>
                    <RaisedButton type="submit" label="Lagre" disabled={true}/>
                    <RaisedButton label="Endre bruker" disabled={false} onClick={handleEdit}/>
                    <RaisedButton label="Tilbakestill" disabled={false} onClick={handleClear}/>
                </form>
            </MuiThemeProvider>
        );
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
    form: 'UserInForm',
    enableReinitialize: true
})(UserInForm));
