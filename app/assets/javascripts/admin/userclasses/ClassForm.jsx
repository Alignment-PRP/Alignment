import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderMultiTextField, validateClassForm as validate} from './../../core/render';

/**
 * Redux-form for user creation and updating.
 */
class ClassForm extends React.Component {

    render() {
        const {handleSubmit, handleClose, pristine, submitting, reset} = this.props;
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <div className="form-inner-class">
                        <div className="form-inner-field">
                            <Field
                                name="NAME"
                                label="Klassenavn"
                                component={renderTextField}
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="description"
                                label="Beskrivelse"
                                rows={4}
                                maxRows={4}
                                component={renderMultiTextField}
                            />
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                        <RaisedButton className="form-button" label="Tilbakestill" onClick={reset} disabled={pristine}/>
                        <RaisedButton className="form-button" style={{marginLeft: 'auto'}} secondary={true} label="Avbryt" onClick={handleClose}/>
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
    form: 'ClassForm',
    validate,
    enableReinitialize: true
})(ClassForm));
