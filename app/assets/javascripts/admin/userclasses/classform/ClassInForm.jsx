import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {renderTextField, renderMultiTextField, renderSelectField, menuItemsClasses, validateDeleteClassForm as validate} from '../../render';

/**
 * Redux-form for displaying a form filled with classdata.
 * All fields are disabled.
 */
class ClassInForm extends React.Component {

    render() {
        const {handleSubmit, handleEdit, handleClear, classes} = this.props;
        return (
            <MuiThemeProvider>
                <Paper className="form-inner">
                    <h2>Rediger brukerklasse</h2>
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="NAME"
                            label="Klassenavn"
                            disabled={true}
                            component={renderTextField}
                        />
                        <Field
                            name="description"
                            label="Beskrivelse"
                            disabled={true}
                            component={renderMultiTextField}
                        />
                        <Field
                            name="replacement"
                            label="Erstatter"
                            disabled={false}
                            component={renderSelectField}
                        >
                            {menuItemsClasses(classes.filter(e => e.NAME != this.props.initialValues.NAME))}
                        </Field>
                        <RaisedButton className="form-button" type="submit" primary={true} label="Slett" disabled={false}/>
                        <RaisedButton className="form-button" secondary={true} label="Endre klasse" disabled={false} onClick={handleEdit}/>
                        <RaisedButton className="form-button" label="Tilbakestill" disabled={false} onClick={handleClear}/>
                    </form>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        initialValues: state.classFormReducer.data,
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
    form: 'ClassInForm',
    enableReinitialize: true,
    validate
})(ClassInForm));
