import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './../../admin/render.jsx';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

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
        const { handleSubmit, structure } = this.props;
        return (
            <div className="add-requirement">
                <h2>Lag nytt krav</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name"> Krav navn </label><br/>
                        <Field type="text" component={renderTextField} name="name" required/>
                    </div>
                    <div>
                        <label htmlFor="reqNo"> reqNo </label><br/>
                        <Field type="text" component={renderTextField} name="reqNo" required/>
                    </div>
                    <div>
                        <label htmlFor="reqCode"> reqCode </label><br/>
                        <Field type="text" component={renderTextField} name="reqCode" required/>
                    </div>
                    <div>
                        <label htmlFor="reqResponsible"> reqResponsible </label><br/>
                        <Field type="text" component={renderTextField} name="reqResponsible" required/>
                    </div>
                    <div>
                        <label htmlFor="subCatID"> subCategory </label><br/>
                        <Field type="number" component={renderTextField} name="subCatID" required/>
                    </div>
                    <div>
                        <label htmlFor="description"> Beskrivelse </label><br/>
                        <Field type="text" component={renderTextField} name="description" required/>
                    </div>
                    <div>
                        <label htmlFor="comment"> Kommentar </label><br/>
                        <Field type="text" component={renderTextField} name="comment" required/>
                    </div>
                    {this.renderStructureForm(structure)}
                    <br/>
                    <RaisedButton type="submit">Oppdater</RaisedButton>
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

