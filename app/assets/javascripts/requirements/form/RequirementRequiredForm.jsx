import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { renderTextField, renderSelectField, renderMultiTextField } from './../../core/render';
import {FlatButton, RaisedButton} from "material-ui";

class RequirementRequiredForm extends React.Component {

    renderCategoryItems(categories) {
        return (
            null
        );
    }

    renderUsers(users) {
        return (
            null
        );
    }

    render() {
        const { handleSubmit, handleClose, users, categories } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-field-row">
                    <Field
                        name="name"
                        label="Krav navn"
                        component={renderTextField}
                        required
                    />
                    <div style={{width: '256px'}}/>
                </div>
                <div className="form-field-row">
                    <Field
                        name="reqNo"
                        label="reqNo"
                        component={renderTextField}
                        required
                    />
                    <Field
                        name="reqCode"
                        label="reqCode"
                        component={renderTextField}
                        required
                    />
                </div>
                <div className="form-field-row">
                    <Field
                        component={renderSelectField}
                        name="reqResponsible"
                        label="reqResponsible"
                    >
                        {this.renderUsers(users)}
                    </Field>
                    <Field
                        component={renderSelectField}
                        name="scID"
                        label="Kategori"
                    >
                        {this.renderCategoryItems(categories)}
                    </Field>
                </div>
                <div className="form-field-row">
                    <Field
                        name="description"
                        label="Beskrivelse"
                        component={renderMultiTextField}
                        required
                    />
                    <Field
                        name="comment"
                        label="Kommentar"
                        component={renderMultiTextField}
                        required
                    />
                </div>
                <div style={{display: 'flex', height: '48px', justifyContent: 'flex-start', alignItems: 'center', marginTop: '24px'}}>
                    <FlatButton
                        secondary={true}
                        label="Tilbake"
                        disabled={true}
                        style={{margin: '8px 8px 8px 8px'}}
                    />
                    <FlatButton
                        secondary={true}
                        label="Avbryt"
                        style={{margin: '8px 0 8px auto'}}
                        onTouchTap={handleClose}

                    />
                    <RaisedButton
                        primary={true}
                        type="submit"
                        label="Neste"
                        style={{margin: '8px 8px 8px 8px'}}
                    />
                </div>
            </form>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        initialValues: state.requirementFormReducer.requiredValues
    }
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'RequirementRequiredForm',
    enableReinitialize: true
})(RequirementRequiredForm));
