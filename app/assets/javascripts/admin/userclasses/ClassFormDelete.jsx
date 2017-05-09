import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import {renderSelectField, menuItemsClasses, validateDeleteClassForm as validate} from './../../core/render';
import HelpToolTip from './../../core/HelpToolTip';

/**
 * Redux-form for user creation and updating.
 */
class ClassForm extends React.Component {

    render() {
        const { classes, handleSubmit, handleClose, pristine, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="form-inner-field">
                        <div className="tool-tip-container">
                            <Field
                                name="replacement"
                                floatingLabelText="Erstatter"
                                disabled={false}
                                component={renderSelectField}
                                >
                                {menuItemsClasses(classes.filter(e => e.NAME !== this.props.initialValues.NAME))}
                            </Field>
                            <HelpToolTip toolTip="Velg ny brukerklasse for brukere som blir påvirket av handlingen." style={{marginTop: 0}}/>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <RaisedButton className="form-button" primary={true} type="submit" label="Slett" disabled={pristine || submitting}/>
                    <RaisedButton className="form-button" secondary={true} label="Avbryt" onClick={handleClose}/>
                </div>
            </form>
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