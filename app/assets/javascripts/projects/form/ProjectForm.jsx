import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderCheckbox, warnNumberField, validateProjectForm as validate} from './../../core/render.jsx';

/**
 * Redux-form for project creation.
 * @see Projects
 * @see module:admin/render.validateProjectForm
 * @see module:admin/render.renderTextField
 * @see module:admin/render.renderCheckbox
 */
class ProjectForm extends React.Component {

    render() {
        const {
            handleSubmit, handleClear,
            pristine, reset, submitting
        } = this.props;
        return(
            <MuiThemeProvider>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-inner">
                        <div className="form-inner-field">
                            <Field
                                name="name"
                                label="Projektnavn"
                                component={renderTextField}
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="securityLevel"
                                label="Sikkerhetsnivå"
                                warn={warnNumberField}
                                component={renderTextField}
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="transactionVolume"
                                label="Transaksjonsvolum"
                                component={renderTextField}
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="userChannel"
                                label="Brukerkanal"
                                component={renderTextField}
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="deploymentStyle"
                                label="Distribusjonsstil"
                                component={renderTextField}
                            />
                        </div>
                        <div className="form-inner-field-checkbox">
                            <Field
                                name="isPublic"
                                label="Offentlig"
                                component={renderCheckbox}
                            />
                        </div>
                    </div>
                    <div>
                        <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                        <RaisedButton className="form-button" label="Tilbakestill" onClick={reset}/>
                    </div>
                </form>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        initialValues: {
            isPublic: true
        },
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
    form: 'ProjectForm',
    validate,
    enableReinitialize: true
})(ProjectForm));
