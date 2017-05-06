import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { renderTextField, renderSelectField, renderMultiTextField, renderAutoComplete } from './../../core/render';
import {AutoComplete, Divider, FlatButton, MenuItem, RaisedButton, Subheader} from "material-ui";
import HelpToolTip from './../../core/HelpToolTip';

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
                    <div className="tool-tip-container">
                        <Field
                            name="name"
                            label="Krav navn"
                            component={renderTextField}
                            required
                        />
                        <HelpToolTip toolTip="Navnet på dette kravet."/>
                    </div>
                <div style={{width: '256px'}}/>
                </div>
                <div className="form-field-row">
                    <div className="tool-tip-container">
                        <Field
                            name="reqNo"
                            label="Kravnummer"
                            component={renderTextField}
                            required
                        />
                        <HelpToolTip toolTip="Hva er kravnummeret?"/>
                    </div>
                    <div className="tool-tip-container">
                        <Field
                            name="reqCode"
                            label="Kravkode"
                            component={renderTextField}
                            required
                        />
                        <HelpToolTip toolTip="Hva er kravkoden?"/>
                    </div>
                </div>
                <div className="form-field-row">
                    <div className="tool-tip-container">
                        <Field component={renderAutoComplete}
                               name="reqResponsible"
                               floatingLabelText="Kravansvarlig"
                               data={users.map(u => u.USERNAME)}
                               hintText='Søk'
                               openOnFocus
                               required
                        />
                        <HelpToolTip toolTip="Ansvarlig for dette kravet, klikk på feltet for å få opp en liste."/>
                    </div>
                    <div className="tool-tip-container">
                        <Field component={renderSelectField}
                               name="scID"
                               floatingLabelText="Kategori"
                        >
                            {this.renderCategoryItems(categories)}
                        </Field>
                        <HelpToolTip toolTip="Hvilken kategor skal dette kravet bli sortert under."/>
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
                        <HelpToolTip toolTip="Beskrivelse av kravet i sin helhet."/>
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
                <div className="form-button-row">
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
    const initialValues = state.requirementFormReducer.requiredValues;
    initialValues.reqResponsible = state.userReducer.userdata.USERNAME;
    return {
        initialValues: initialValues
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
