import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './../../admin/render.jsx';

class RequirementForm extends React.Component {

    renderStructureForm(structure){

       return structure.map(structure => {
           return (
               <div>
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
            <div className="add-requirement">
                <h2>Lag nytt krav</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name"> Krav navn </label>
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
                    <br/>
                    <div>
                        <label> reqResponsible </label>
                        <Field component="select" name="reqResponsible">
                            {this.renderUsers(users)}
                        </Field>
                    </div>
                    <br/>
                    <div>
                        <label> Kategori </label>
                        <Field name="scID" component="select" >
                            {this.renderCategoryItems(categories)}
                        </Field>
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
                    <button type="submit">Legg til</button>
                </form>
            </div>
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
})(RequirementForm));

