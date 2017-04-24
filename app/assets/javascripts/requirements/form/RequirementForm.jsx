import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './../../core/render';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


class RequirementForm extends React.Component {

    constructor(props) {
        super(props);

        this.style = {
            display: 'inline-block',
            margin: '16px 32px 16px 0'
        };
    }

    renderStructureForm(structure){

       return structure.map(structure => {
           return (
               <div>
                   <label htmlFor={Object.keys(structure)}> {Object.keys(structure)} </label><br/>
                   <Field type="text" component={renderTextField} name={Object.keys(structure)} /><br/>
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
        const { handleSubmit, structure, categories, users} = this.props;
        return (
                <form onSubmit={handleSubmit}>
                    <div className="form-inner">
                        <div className="form-inner-field">
                            <label htmlFor="name"> Krav navn </label><br/>
                            <Field type="text" component={renderTextField} name="name" required/><br/>
                        </div>
                        <div className="form-inner-field">
                            <label htmlFor="reqNo"> reqNo </label><br/>
                            <Field type="text" component={renderTextField} name="reqNo" required/><br/>
                        </div>
                        <div className="form-inner-field">
                            <label htmlFor="reqCode"> reqCode </label><br/>
                            <Field type="text" component={renderTextField} name="reqCode" required/><br/>
                        </div>
                        <br/>
                        <divt >
                            <label> reqResponsible </label><br/>
                            <Field component="select" name="reqResponsible">
                                {this.renderUsers(users)}
                            </Field><br/>
                        </divt>
                        <br/>
                        <div className="form-inner-field">
                            <label> Kategori </label><br/>
                            <Field name="scID" component="select" >
                                {this.renderCategoryItems(categories)}
                            </Field><br/>
                        </div>
                        <div className="form-inner-field">
                            <label htmlFor="description"> Beskrivelse </label><br/><br/>
                            <Field type="text" component={renderTextField} name="description" required/><br/>
                        </div>
                        <div className="form-inner-field">
                            <label htmlFor="comment"> Kommentar </label><br/>
                            <Field type="text" component={renderTextField} name="comment" /><br/>
                        </div>
                        {this.renderStructureForm(structure)}
                        <RaisedButton primary={true} type="submit">Legg Til</RaisedButton>
                    </div>
                </form>
        );
    }
}


export default connect(
    null,
    null
)(reduxForm({
    form: 'RequirementForm',
})(RequirementForm));

