import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, renderMultiTextField } from '../../core/render';
import RaisedButton from 'material-ui/RaisedButton';
import HelpToolTip from './../../core/HelpToolTip';

class ProjectReqForm extends React.Component {

    render() {
        const { handleSubmit, handleClose } = this.props;
        return (
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="form-inner">
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="reqNo"
                                label="Kravnummer"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Kravnummere, eks 001"/>
                        </div>
                        <div className="tool-tip-container">
                            <Field
                                name="reqCode"
                                label="Kravkode"
                                component={renderTextField}
                            />
                            <HelpToolTip toolTip="Kravkoden, eks NFR001"/>
                        </div>
                    </div>
                    <div className="form-field-row">
                        <div className="tool-tip-container">
                            <Field
                                name="description"
                                label="Beskrivelse"
                                component={renderMultiTextField}
                                required
                            />
                            <HelpToolTip toolTip="Beskrivelsen av kravet"/>
                        </div>
                        <div className="tool-tip-container">
                            <Field
                                name="comment"
                                label="Kommentar"
                                component={renderMultiTextField}
                                required
                            />
                            <HelpToolTip toolTip="Kommentar på dette kravet."/>
                        </div>
                    </div>
                </div>
                <div className="form-button-row">
                    <RaisedButton className="form-button" secondary={true} label="Avbryt" onClick={handleClose}/>
                    <RaisedButton className="form-button" style={{marginLeft: 'auto'}} primary={true} type="submit" label="Lagre"/>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.requirementReducer.requirementMetadata
    };
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'ProjectReqForm',
})(ProjectReqForm));

