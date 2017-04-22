import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderSelectField, menuItemsClasses, validateDeleteClassForm as validate} from './../../core/render';

/**
 * Redux-form for user creation and updating.
 */
class ClassForm extends React.Component {

    render() {
        const { classes, handleSubmit, handleClose, pristine, submitting } = this.props;
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="form-inner-field">
                            <Field
                                name="replacement"
                                label="Erstatter"
                                disabled={false}
                                component={renderSelectField}
                            >
                                {menuItemsClasses(classes.filter(e => e.NAME !== this.props.initialValues.NAME))}
                            </Field>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <RaisedButton className="form-button" primary={true} type="submit" label="Slett" disabled={pristine || submitting}/>
                        <RaisedButton className="form-button" secondary={true} label="Avbryt" onClick={handleClose}/>
                    </div>
                </form>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    let initialValues;
    if (state.classFormReducer.uClass) {
        initialValues = state.classFormReducer.uClass;
        initialValues.oldNAME = initialValues.NAME;
    }
    return {
        initialValues: initialValues
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
    form: 'ClassFormDelete',
    validate,
    enableReinitialize: true
})(ClassForm));
