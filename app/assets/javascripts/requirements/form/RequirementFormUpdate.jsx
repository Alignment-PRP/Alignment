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

    render() {
        const { handleSubmit, initialValues, structure } = this.props;
        return (
            <div className="update-requirement">
                <h2>Oppdater krav</h2>
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
                    <div>
                        <label htmlFor="reqResponsible"> reqResponsible </label>
                        <Field type="text" component={renderTextField} name="reqResponsible" required/>
                    </div>
                    <div>
                        <label htmlFor="subCatID"> subCategory </label>
                        <Field type="text" component={renderTextField} name="subCatID" required/>
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
        initialValues: state.requirementReducer.requirements
    };
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'RequirementForm',
})(RequirementForm));

