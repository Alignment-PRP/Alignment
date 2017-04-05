import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses} from '../../render.jsx';

/**
 * Redux-form for displaying a form filled with userdata.
 * All fields are disabled.
 */
class UserInForm extends React.Component {

    render() {
        const {handleSubmit, handleEdit, handleClear, classes} = this.props;
        return (
            <MuiThemeProvider>
                <Paper className="form-inner">
                    <h2>Rediger bruker</h2>
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
                        >
                            {menuItemsClasses(classes)}
                        </Field>
                        <br/>
                        <RaisedButton className="form-button" type="submit" label="Lagre" disabled={true}/>
                        <RaisedButton className="form-button" secondary={true} label="Endre bruker" disabled={false} onClick={handleEdit}/>
                        <RaisedButton className="form-button" label="Tilbakestill" disabled={false} onClick={handleClear}/>
                    </form>
                </Paper>
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
    mapDispatchToProps
)(reduxForm({
    form: 'UserInForm',
    enableReinitialize: true
})(UserInForm));
