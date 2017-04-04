import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './../../admin/render.jsx';

class AddRequirementForm extends React.Component {

    render() {
        const { handleSubmit, initialValues } = this.props;
        return (
            <div className="update-requirement">
                <h2>Lag nytt krav</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="projectID"> Project ID </label>
                        <Field type="number" component={renderTextField} name="PID" readOnly/>
                    </div>
                    <div>
                        <label htmlFor="KravID"> Krav ID </label>
                        <Field type="number" component={renderTextField} name="RID" readOnly/>
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
                        <label htmlFor="description"> Beskrivelse </label>
                        <Field type="text" component={renderTextField} name="description" required/>
                    </div>
                    <div>
                        <label htmlFor="comment"> Kommentar </label>
                        <Field type="text" component={renderTextField} name="comment" required/>
                    </div>
                    <button type="submit">Oppdater</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.requirementReducer.projectRequirement,
    };
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'NewRequirementForm',
})(AddRequirementForm));


/* Old Form
 <div className="update-requirement">
 <form action={URLS.PROJECT_REQUIREMENT_POST_UPDATE} method="post">
 <h2>Oppdater Prosjekt Krav</h2>

 <br />
 <label><b>Project ID</b></label><br/>
 <input type="number" defaultValue={this.props.projectRequirement.PID} name="PID" min="0" readOnly/>
 <br/>

 <label><b>KravId</b></label><br/>
 <input type="number" defaultValue={this.props.projectRequirement.RID} name="RID" min="0" readOnly/>

 <br/>
 <label><b>reqNo</b></label><br/>
 <input type="text" defaultValue={this.props.projectRequirement.reqNo} name="reqNo" required/>

 <br/>
 <label><b>reqCode</b></label><br/>
 <input type="text" defaultValue={this.props.projectRequirement.reqCode} name="reqCode" required/>

 <br/>
 <label><b>description</b></label><br/>
 <textarea type="text" defaultValue={this.props.projectRequirement.description} name="description" required/>

 <br/>
 <label><b>comment</b></label><br/>
 <textarea type="text" defaultValue={this.props.projectRequirement.comment} name="comment" required/>

 <br/>
 <br/>

 <button type="submit">Oppdater</button>
 </form>
 </div>
 */