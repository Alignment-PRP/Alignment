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
        return subCategories.map((subCategory, index) => {
            return (
                <option key={index} value={subCategory.subcategoryID}>{subCategory.subcategoryName}</option>
            )
        });

    }

    renderCategoryItems(categories){
        return categories.map((category, index) => {
            return (
                <optgroup key={index} label={category.name}>
                    {this.renderSubCategoryItems(category.subcategories)}
                </optgroup>
            )
        });
    }

    renderUsers(users){
        return users.map((user, index) => {
            return <option key={index} value={user.USERNAME}>{user.USERNAME}</option>
        })
    }

    render() {
        const { handleSubmit, structure, categories, users } = this.props;
        return (
            <div className="update-requirement">
                <h2>Oppdater krav</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ID"> Krav ID </label><br/>
                        <Field type="text" component={renderTextField} name="ID" readOnly/><br/>
                    </div>
                    <div>
                        <label htmlFor="name"> Krav Navn </label><br/>
                        <Field type="text" component={renderTextField} name="name" required/><br/>
                    </div>
                    <div>
                        <label htmlFor="reqNo"> reqNo </label><br/>
                        <Field type="text" component={renderTextField} name="reqNo" required/><br/>
                    </div>
                    <div>
                        <label htmlFor="reqCode"> reqCode </label><br/>
                        <Field type="text" component={renderTextField} name="reqCode" required/><br/>
                    </div>
                    <br/>
                    <div>
                        <label> reqResponsible </label><br/>
                        <Field component="select" name="reqResponsible">
                            {this.renderUsers(users)}
                        </Field><br/>
                    </div>
                    <br/>
                    <div>
                        <label> Kategori </label><br/>
                        <Field name="scID" component="select" >
                            {this.renderCategoryItems(categories)}
                        </Field><br/>
                    </div>
                    <div>
                        <label htmlFor="description"> Beskrivelse </label><br/>
                        <Field type="text" component={renderTextField} name="description" required/><br/>
                    </div>
                    <div>
                        <label htmlFor="comment"> Kommentar </label><br/>
                        <Field type="text" component={renderTextField} name="comment" required/><br/>
                    </div>
                    {this.renderStructureForm(structure)}<br/><br/>
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

