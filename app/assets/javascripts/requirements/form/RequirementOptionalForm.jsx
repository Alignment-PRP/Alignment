import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { renderTextField, renderAutoComplete } from './../../core/render';
import {CircularProgress, FlatButton, FontIcon, LinearProgress, RaisedButton} from "material-ui";
import { getStructures } from './../../redux/actions/structureActions';
import {amber500, lightGreen500} from "material-ui/styles/colors";

class RequirementOptionalForm extends React.Component {

    componentWillMount() {
        this.props.getStructures();
    }

    /**
     *
     * @param {Array} structure
     * @returns {Array}
     */
    renderStructure(structureTypes, structuresData) {
        const comps = structureTypes.map((type, index) => {
            return <Field key={index}
                          component={renderAutoComplete}
                          name={type}
                          data={structuresData ? structuresData[type].map(structure => structure.content) : []}
                          floatingLabelText={type}
                          hintText={type}
            />;
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

    renderHint(sent, received) {
        if (sent && !received) {
            return (
                <div style={{display: 'flex', alignItems: 'center', margin: '8px'}}>
                    <CircularProgress size={25}/>
                    <span style={{margin: '8px', color: '#FFC107'}}>Sender...</span>
                </div>
            );
        } else if (sent && received) {
            return (
                <div style={{display: 'flex', alignItems: 'center', margin: '8px'}}>
                    <FontIcon className="material-icons" color={lightGreen500}>done</FontIcon>
                    <span style={{margin: '8px', color: '#8BC34A'}}>Mottatt</span>
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        const { handleSubmit, handleClose, structureTypes, structures,
            back, sent, received
        } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                {structures ? null : <LinearProgress mode="indeterminate"/>}
                {this.renderStructure(structureTypes, structures)}
                <div style={{display: 'flex', height: '48px', justifyContent: 'flex-start', alignItems: 'center', marginTop: '24px'}}>
                    <FlatButton
                        secondary={true}
                        label="Tilbake"
                        onTouchTap={back}
                        style={{margin: '8px 8px 8px 8px'}}
                    />
                    {this.renderHint(sent, received)}
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
                        style={{margin: '8px 8px 8px 8px', display: 'flex', alignItems: 'center'}}
                    />
                </div>
            </form>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        initialValues: state.requirementFormReducer.optionalValues,
        structures: state.structureReducer.structures,
        sent: state.requirementFormReducer.sent,
        received: state.requirementFormReducer.received
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStructures: () => {
            dispatch(getStructures());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'RequirementOptionalForm',
    enableReinitialize: true
})(RequirementOptionalForm));
