import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import {renderTextField, renderMultiTextField, validateClassForm as validate} from './../../core/render';
import HelpToolTip from './../../core/HelpToolTip';

/**
 * Redux-form for user creation and updating.
 */
class ClassForm extends React.Component {

    render() {
        const {handleSubmit, handleClose, pristine, submitting, reset} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-inner-class">
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="NAME"
                                label="Klassenavn"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Navnet på den nye brukerklassen."/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="description"
                                label="Beskrivelse"
                                component={renderMultiTextField}
                            />
                            <HelpToolTip toolTip="Beskrivelse av brukerklasse. Rettigheter og bruksområde. osv."/>
                        </div>
                    </div>
                </div>
                <div className="form-button-row">
                    <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                    <RaisedButton className="form-button" label="Tilbakestill" onClick={reset} disabled={pristine}/>
                    <RaisedButton className="form-button" style={{marginLeft: 'auto'}} secondary={true} label="Avbryt" onClick={handleClose}/>
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
    form: 'ClassForm',
    validate,
    enableReinitialize: true
})(ClassForm));