import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {renderTextField, renderCheckbox, warnNumberField, validateProjectForm as validate} from './../../core/render';
import HelpToolTip from './../../core/HelpToolTip';

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
            handleSubmit, handleClose,
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
                            <HelpToolTip toolTip="Navngi prosjektet. Tar tall og bokstaver. Det meste funker her." toolTipPosition="bottom-left"/>
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="securityLevel"
                                label="Sikkerhetsnivå"
                                warn={warnNumberField}
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Hvor sikkert systemer skal være. Tall, 1,2,3,4" toolTipPosition="bottom-left"/>
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="transactionVolume"
                                label="Transaksjonsvolum"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="1-100/dag, 100-1000/dag, 1000-10000/dag" toolTipPosition="bottom-left"/>
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="userChannel"
                                label="Brukerkanal"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Nettleser, Desktop, App" toolTipPosition="bottom-left"/>
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="deploymentStyle"
                                label="Distribusjonsstil"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="On-premise, privat sky, public sky" toolTipPosition="bottom-left"/>
                        </div>
                        <div className="form-inner-field-checkbox">
                            <Field
                                name="isPublic"
                                label="Offentlig"
                                component={renderCheckbox}
                            />
                            <HelpToolTip toolTip={"Skal prosjektet være synlig for alle brukere?"} toolTipPosition="bottom-center"/>
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
