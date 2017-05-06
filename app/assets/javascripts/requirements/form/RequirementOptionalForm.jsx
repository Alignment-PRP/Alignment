import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { renderTextField, renderAutoComplete } from './../../core/render';
import {CircularProgress, FlatButton, FontIcon, LinearProgress, RaisedButton} from "material-ui";
import {amber500, lightGreen500, red500} from "material-ui/styles/colors";
import HelpToolTip from './../../core/HelpToolTip';

class RequirementOptionalForm extends React.Component {

    /**
     *
     * @param {Array.<String>}structureTypes
     * @param {Array.<Structure>}structuresData
     * @returns {Array.<XML>}
     */
    renderStructure(structureTypes, structures) {
        const comps = structureTypes.map((type, index) => {
            return (<div className="tool-tip-container">
                        <Field key={index}
                                  component={renderAutoComplete}
                                  name={type}
                                  data={structures[type].map(struc => struc.content)}
                                  floatingLabelText={type}
                                  hintText={type}
                                  openOnFocus
                        />
                    <HelpToolTip toolTip={"Dette er " + type + " strukturen."}/>
                </div>);
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

    renderHint(sent, error, received) {
        if (sent && received) {
            return (
                <div style={{display: 'flex', alignItems: 'center', margin: '8px'}}>
                    <FontIcon className="material-icons" color={lightGreen500}>done</FontIcon>
                    <span style={{margin: '8px', color: '#8BC34A'}}>Mottatt</span>
                </div>
            );
        } else if (sent && error) {
            return (
                <div style={{display: 'flex', alignItems: 'center', margin: '8px'}}>
                    <FontIcon className="material-icons" color={red500}>error</FontIcon>
                    <span style={{margin: '8px', color: '#8BC34A'}}>Noe gikk galt...</span>
                </div>
            );
        } else if (sent && !received) {
            return (
                <div style={{display: 'flex', alignItems: 'center', margin: '8px'}}>
                    <CircularProgress size={25}/>
                    <span style={{margin: '8px', color: '#FFC107'}}>Sender...</span>
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        const { handleSubmit, handleClose, structureTypes, structures,
            back, sent, error, received, currentValues
        } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                {structures ? null : <LinearProgress mode="indeterminate"/>}
                {structureTypes ? this.renderStructure(structureTypes, structures) : null}
                <div style={{display: 'flex', height: '48px', justifyContent: 'flex-start', alignItems: 'center', marginTop: '24px'}}>
                    <FlatButton
                        secondary={true}
                        label="Tilbake"
                        onTouchTap={back.bind(null, currentValues)}
                        style={{margin: '8px 8px 8px 8px'}}
                    />
                    {this.renderHint(sent, error, received)}
                    <FlatButton
                        secondary={true}
                        label="Avbryt"
                        style={{margin: '8px 0 8px auto'}}
                        onTouchTap={handleClose}

                    />
                    <RaisedButton
                        primary={true}
                        disabled={sent && !error}
                        type="submit"
                        label="Lagre"
                        style={{margin: '8px 8px 8px 8px', display: 'flex', alignItems: 'center'}}
                    />
                </div>
            </form>
        );
    }

}

const selector = formValueSelector('RequirementOptionalForm');
const mapStateToProps = (state, props) => {
    const currentValues = {};
    props.structureTypes.forEach(type => {
        currentValues[type] = selector(state, type)
    });
    return {
        initialValues: state.requirementFormReducer.optionalValues,
        sent: state.requirementFormReducer.sent,
        error: state.requirementFormReducer.error,
        received: state.requirementFormReducer.received,
        currentValues: currentValues
    }
};

export default connect(
    mapStateToProps,
    null
)(reduxForm({
    form: 'RequirementOptionalForm',
    enableReinitialize: true
})(RequirementOptionalForm));
