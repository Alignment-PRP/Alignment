import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './../../core/render';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
                   <Field type="text" component={renderTextField} name={structure} label={structure} /><br/>
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
                <div key={index} className="form-inner-field">
                    <optgroup label={category.name}>
                        {this.renderSubCategoryItems(category.subcategories)}
                    </optgroup>
                </div>
            )
        });
    }

    renderUsers(users){
        return users.map((user, index) => {
            return <option key={index} value={user.USERNAME}>{user.USERNAME}</option>
        })
    }

    render() {
        const { handleSubmit, handleClose, structure, categories, users} = this.props;
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-inner">
                        <div className="form-inner-field">
                            <Field
                                name="name"
                                label="Krav navn"
                                component={renderTextField}
                                required
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="reqNo"
                                label="reqNo"
                                component={renderTextField}
                                required
                            />
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="reqCode"
                                label="reqCode"
                                component={renderTextField}
                                required
                            />
                        </div>
                        <div>
                            <Field component="select" name="reqResponsible" label="reqResponsible">
                                {this.renderUsers(users)}
                            </Field>
                        </div>
                        <div className="form-inner-field">
                            <Field name="scID" component="select" label="Kategori">
                                {this.renderCategoryItems(categories)}
                            </Field>
                        </div>
                        <div className="form-inner-field">
                            <Field
                                name="description"
                                label="Beskrivelse"
                                component={renderTextField}
                                required
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
                            {this.renderStructureForm(structure)}
                        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                            <RaisedButton className="form-button" primary={true} type="submit" label="Lagre"/>
                            <RaisedButton className="form-button" style={{marginLeft: 'auto'}} secondary={true} label="Avbryt" onClick={handleClose}/>
                        </div>
                    </div>
                </form>
            </MuiThemeProvider>
        );
    }
}


export default connect(
    null,
    null
)(reduxForm({
    form: 'RequirementForm',
})(RequirementForm));

