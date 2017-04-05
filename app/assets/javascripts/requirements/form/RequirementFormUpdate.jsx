import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {renderTextField, renderPassField, renderSelectField, menuItemsClasses} from '../../admin/render.jsx';

class RequirementFormUpdate extends React.Component {

    renderStructureForm(structure){

       return structure.map((structure, index) => {
           return (
               <div key={index}>
                   <label htmlFor={Object.keys(structure)}> {Object.keys(structure)} </label>
                   <Field type="text" component={renderTextField} name={Object.keys(structure)} required/>
               </div>
           )
       });
    }

    renderSubCategoryItems(subCategories){
        return subCategories.map((subCategories, index) => {
            return (
                <option>{subCategories.subcategoryName}</option>
            )
        });

    }

    renderCategoryItems(categories){
        return categories.map((categories, index) => {
            <optgroup label={categories.name}>
                {this.renderSubCategoryItems(categories.subcategories)}
            </optgroup>
        });
    }

    render() {
        const { handleSubmit, structure, categories } = this.props;
        return (
            <div className="update-requirement">
                <h2>Oppdater krav</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ID"> Krav ID </label>
                        <Field type="text" component={renderTextField} name="ID" readOnly/>
                    </div>
                    <div>
                        <label htmlFor="name"> Krav Navn </label>
                        <Field type="text" component={renderTextField} name="name" required/>
                    </div>
                    <div>
                        <label htmlFor="reqNo"> reqNo </label>
                        <Field type="text" component={renderTextField} name="reqNo" required/>
                    </div>
                    <div>
                        <label htmlFor="reqCode"> reqCode </label>
                        <Field type="text" component={renderTextField} name="reqCode" required/>
                    </div>
                    <div>
                        <label htmlFor="reqResponsible"> reqResponsible </label>
                        <Field type="text" component={renderTextField} name="reqResponsible" required/>
                    </div>
                    <div>
                        <select name="scID">
                            {this.renderCategoryItems(categories)}
                        </select>
                        /*
                        <Field
                            name="scID"
                            label="Kategori"
                            disabled={true}
                            component={renderSelectField}
                        >
                            {menuItemsCategories(categories)}
                        </Field>
                        */
                    </div>
                    <div>
                        <label htmlFor="description"> Beskrivelse </label>
                        <Field type="text" component={renderTextField} name="description" required/>
                    </div>
                    <div>
                        <label htmlFor="comment"> Kommentar </label>
                        <Field type="text" component={renderTextField} name="comment" required/>
                    </div>
                    {this.renderStructureForm(structure)}
                    <button type="submit">Oppdater</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.requirementReducer.requirement
    };
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'RequirementFormUpdate'
})(RequirementFormUpdate));

