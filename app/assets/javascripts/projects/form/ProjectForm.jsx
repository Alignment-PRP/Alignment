/**
 * Redux-form for project creation.
 * @see Projects
 * @see module:admin/render.validateProjectForm
 * @see module:admin/render.renderTextField
 * @see module:admin/render.renderCheckbox
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderMultiTextField, renderSelectField, renderCheckbox, warnNumberField, renderAutoComplete, validateProjectForm as validate} from './../../core/render';
import {Divider, MenuItem, Subheader} from "material-ui";

class ProjectForm extends React.Component {

    renderManagerIDItems(managers){
        const output = [];
        managers.forEach((manager, index) => {
            if (index > 0) output.push(<Divider key={output.length}/>);
            output.push(<MenuItem key={output.length} value={manager.USERNAME} primaryText={manager.USERNAME}/>)
            });
        return output;
    }

    render() {
        const {
            handleSubmit, handleClose, users,
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
                            <Field component={renderSelectField}
                                   name="managerID"
                                   floatingLabelText="Leder"
                            >
                                {this.renderManagerIDItems(users)}
                            </Field>
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="description"
                                label="Beskrivelse"
                                component={renderMultiTextField}
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
    const initialValues = state.projectReducer.initEditProjectForm;
    initialValues.proManager = state.userReducer.userdata.USERNAME;
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
    form: 'ProjectForm',
    validate,
    enableReinitialize: true
})(ProjectForm));
