import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { renderTextField, renderSelectField, renderMultiTextField, renderAutoComplete } from './../../core/render';
import {AutoComplete, Divider, FlatButton, MenuItem, RaisedButton, Subheader} from "material-ui";

const validate = (values, props) => {
    const errors = {};
    const requiredField = ['scID'];
    requiredField.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Må fylles';
        }
    });
    if (props.users.filter(user => user.USERNAME === values.reqResponsible).length === 0) {
        errors['reqResponsible'] = 'Bruker eksisterer ikke'
    }
    return errors;
};

class RequirementRequiredForm extends React.Component {

    /**
     *
     * @param {Array.<Category>} categories
     * @returns {Array}
     */
    renderCategoryItems(categories) {
        const output = [];
        categories.forEach((category, index) => {
            if (index > 0) output.push(<Divider key={output.length}/>);
            output.push(<Subheader key={output.length}>{category.name}</Subheader>);
            category.subcategories.forEach(sub => {
                output.push(<MenuItem key={output.length} value={sub.subcategoryID} primaryText={sub.subcategoryName}/>)
            })
        });
        return output;
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
                    <Field component={renderAutoComplete}
                           name="reqResponsible"
                           floatingLabelText="reqResponsible"
                           data={users.map(u => u.USERNAME)}
                           hintText='Søk'
                           openOnFocus
                           required
                    />
                    <Field component={renderSelectField}
                           name="scID"
                           floatingLabelText="Kategori"
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
    enableReinitialize: true,
    validate
})(RequirementRequiredForm));
