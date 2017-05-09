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
import { getUsersWithClass } from '../../redux/actions/userActions';
import {renderTextField, renderMultiTextField, renderCheckbox, warnNumberField, renderAutoComplete, validateProjectForm as validate} from './../../core/render';
import HelpToolTip from './../../core/HelpToolTip';

class ProjectForm extends React.Component {

    componentDidMount(){
        this.props.getUsersWithClass();
    }

    render() {
        const {
            handleSubmit, handleClose, users,
            pristine, reset, submitting
        } = this.props;
        return(
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="form-inner">
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="name"
                                label="Projektnavn"
                                component={renderTextField}>
                            </Field>
                            <HelpToolTip toolTip="Ønsket navn på prosjektet."/>
                        </div>
                        <div className="tool-tip-container">
                            <Field component={renderAutoComplete}
                                   name="managerID"
                                   floatingLabelText="Leder"
                                   data={users ? users.map(u => u.USERNAME) : []}
                                   hintText='Søk'
                                   openOnFocus
                                   required
                            />
                            <HelpToolTip toolTip="Hvem skal stå som manager av prosjektet."/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="description"
                                label="Beskrivelse"
                                component={renderMultiTextField}
                            />
                            <HelpToolTip toolTip="Beskrivelsen av prosjektet, som er synlig på prosjektmenyen." Style={{marginTop:30}} />
                        </div>
                        <div className="tool-tip-container">
                            <Field
                                name="securityLevel"
                                label="Sikkerhetsnivå"
                                warn={warnNumberField}
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="(1-4). Sier noe om sikkerhetsnivået. "/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="transactionVolume"
                                label="Transaksjonsvolum"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="(1-100/dag, 100-1000/dag) Forventet bruksmengde pr tidsenhet."/>
                        </div>
                        <div className="tool-tip-container">
                            <Field
                                name="userChannel"
                                label="Brukerkanal"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="(Nettleser, Desktop, App) Brukersystem."/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="deploymentStyle"
                                label="Deploymentstil"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="(On-premise, private sky, public sky) "/>
                        </div>
                        <div className="tool-tip-container" style={{width: '300px'}}>
                            <Field
                                name="isPublic"
                                label="Offentlig"
                                component={renderCheckbox}
                                style={{maxWidth: '256px', marginTop: '36px'}}
                            />
                            <HelpToolTip toolTip="Hvorvidt prosjektet er offentlig synlig for alle."/>
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
    const initialValues = state.projectReducer.initEditProjectForm;
    if (initialValues !== null) {
        initialValues.proManager = state.userReducer.userdata.USERNAME;
    }
    return {
        users: state.userReducer.users,
        initialValues: initialValues
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersWithClass: () => dispatch(getUsersWithClass())
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
