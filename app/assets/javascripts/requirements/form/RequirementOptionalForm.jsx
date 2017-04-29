import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { renderTextField } from './../../core/render';
import {FlatButton, RaisedButton} from "material-ui";

class RequirementOptionalForm extends React.Component {

    /**
     *
     * @param {Array} structure
     * @returns {Array}
     */
    renderStructure(structure) {
        const comps = structure.map((structure, index) => {
            return <Field key={index} type="text" component={renderTextField} name={structure} label={structure}/>;
        });
        const output = [];

        if (comps.length % 2 === 0) {
            for (let i = 0; i < comps.length; i = i + 2) {
                output.push(
                    <div key={i} className="form-field-row">
                        {comps[i]}
                        {comps[i + 1]}
                    </div>
                )
            }
        } else {
            for (let i = 0; i < comps.length - 1; i = i + 2) {
                output.push(
                    <div key={i} className="form-field-row">
                        {comps[i]}
                        {comps[i + 1]}
                    </div>
                )
            }
            output.push(
                <div key={comps.length} className="form-field-row">
                    {comps[comps.length - 1]}
                    <div style={{width: '256px'}} />
                </div>
            )
        }

        return output;
    }

    render() {
        const { handleSubmit, handleClose, structure, back } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                {this.renderStructure(structure)}
                <div style={{display: 'flex', height: '48px', justifyContent: 'flex-start', alignItems: 'center', marginTop: '24px'}}>
                    <FlatButton
                        secondary={true}
                        label="Tilbake"
                        onTouchTap={back}
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
                        label="Lagre"
                        style={{margin: '8px 8px 8px 8px'}}
                    />
                </div>
            </form>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        initialValues: state.requirementFormReducer.optionalValues
    }
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'RequirementOptionalForm',
    enableReinitialize: true
})(RequirementOptionalForm));
