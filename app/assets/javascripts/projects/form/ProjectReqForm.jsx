import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from '../../core/render';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class ProjectReqForm extends React.Component {

    render() {
        const { handleSubmit, handleClose } = this.props;
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-inner">
                        <div className="form-inner-field">
                            <Field
                                name="PID"
                                label="Prosjekt ID"
                                component={renderTextField}
                                required
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="RID"
                                label="Krav ID"
                                component={renderTextField}
                                required
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="reqNo"
                                label="Kravnummer"
                                component={renderTextField}
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="reqCode"
                                label="Kravkode"
                                component={renderTextField}
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="comment"
                                label="Kommentar"
                                component={renderTextField}
                                required
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="Description"
                                label="Beskrivelse"
                                component={renderTextField}
                                required
                            />
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <RaisedButton className="form-button" primary={true} type="submit" label="Lagre"/>
                        <RaisedButton className="form-button" style={{marginLeft: 'auto'}} secondary={true} label="Avbryt" onClick={handleClose}/>
                    </div>
                </form>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'RequirementForm',
})(ProjectReqForm));

