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
import { getUsersWithClass } from '../../redux/actions/userActions';
import {renderTextField, renderMultiTextField, renderSelectField, renderCheckbox, warnNumberField, renderAutoComplete, validateProjectForm as validate} from './../../core/render';
import {Divider, MenuItem, Subheader} from "material-ui";
import HelpToolTip from './../../core/HelpToolTip';

class ProjectForm extends React.Component {

    componentDidMount(){
        this.props.getUsersWithClass();
    }

    renderManagerIDItems(managers){
        const output = [];
        if (managers) {
            managers.forEach((manager, index) => {
                if (index > 0) output.push(<Divider key={output.length}/>);
                output.push(<MenuItem key={output.length} value={manager.USERNAME} primaryText={manager.USERNAME}/>)
                });
        }
        return output;
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
                            <HelpToolTip toolTip="Navn på prosjektet."/>
                        </div>
                        <div className="tool-tip-container">
                            <Field component={renderSelectField}
                                   name="managerID"
                                   floatingLabelText="Leder"
                            >
                                {this.renderManagerIDItems(users)}
                            </Field>
                            <HelpToolTip toolTip="Hvem skal styre prosjektet."/>
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
                            <HelpToolTip toolTip="1,2,3,4"/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="transactionVolume"
                                label="Transaksjonsvolum"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="1-100/dag, 100-1000/dag, 1000-10000/dag"/>
                        </div>
                        <div className="tool-tip-container">
                            <Field
                                name="userChannel"
                                label="Brukerkanal"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Nettleser, Desktop, App"/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="deploymentStyle"
                                label="Deploymentstil"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="On-premise, privat sky, publik sky. Ref. Mohsen 2017"/>
                        </div>
                        <div className="tool-tip-container" style={{width: '300px'}}>
                            <Field
                                name="isPublic"
                                label="Offentlig"
                                component={renderCheckbox}
                                style={{maxWidth: '256px', marginTop: '36px'}}
                            />
                            <HelpToolTip toolTip="Hvorvidt prosjektet er offentlig synlig."/>
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
