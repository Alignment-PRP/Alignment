import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './../../core/render';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { changeStepperIndex } from './../../redux/actions/requirementFormActions';
import {Step, StepLabel, Stepper} from "material-ui/Stepper";

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

    renderStep(index) {
        switch(index) {
            case 0:
                return this.renderStep0();
            case 1:
                return this.renderStep1();
            default:
                return null;
        }
    }

    renderStep0() {
        return (
            <div className="formInner">
                <div>
                    <Field
                        name="name"
                        label="Krav navn"
                        component={renderTextField}
                        required
                    />
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
            </div>
        );
    }

    renderStep1() {
        return (
            null
        );
    }

    render() {
        const { handleSubmit, handleClose, structure, categories, users, stepperIndex, changeStepperIndex} = this.props;
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit} autoComplete="off">

                    {this.renderStep(stepperIndex)}
                    <div className="formInner">

                        <div className="form-field-row">
                            <Field component="select" name="reqResponsible" label="reqResponsible">
                                {this.renderUsers(users)}
                            </Field>
                            <Field name="scID" component="select" label="Kategori">
                                {this.renderCategoryItems(categories)}
                            </Field>
                        </div>
                        <div className="form-field-row">
                            <Field
                                name="description"
                                label="Beskrivelse"
                                component={renderTextField}
                                required
                            />
                            <Field
                                name="comment"
                                label="Kommentar"
                                component={renderTextField}
                                required
                            />
                        </div>
                        {this.renderStructureForm(structure)}

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
        stepperIndex: state.requirementFormReducer.stepperIndex
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeStepperIndex: (index) => {
            dispatch(changeStepperIndex(index));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'RequirementForm',
})(RequirementForm));

