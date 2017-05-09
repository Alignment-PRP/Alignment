/**
 * Redux-form for user creation and updating.
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import {renderTextField, renderMultiTextField, validateClassForm as validate} from './../../core/render';
import HelpToolTip from './../../core/HelpToolTip';
import {FlatButton} from "material-ui";

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
                    <FlatButton secondary={true}
                                label="Tilbakestill"
                                onClick={reset}
                                disabled={pristine}
                                style={{margin: '8px 8px 8px 8px'}}
                    />
                    <FlatButton secondary={true}
                                label="Avbryt"
                                style={{margin: '8px 0 8px auto'}}
                                onClick={handleClose}
                    />
                    <RaisedButton primary={true}
                                  type="submit"
                                  label="Lagre"
                                  disabled={pristine || submitting}
                                  style={{margin: '8px 8px 8px 8px'}}
                    />
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