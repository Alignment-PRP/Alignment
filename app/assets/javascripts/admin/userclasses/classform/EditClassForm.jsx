import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {renderTextField, renderMultiTextField, validateClassForm as validate} from './../../render.jsx';

class EditClassForm extends React.Component {

    render() {
        const {handleSubmit, handleClear, pristine, submitting, classes} = this.props;
        return (
            <MuiThemeProvider>
                <Paper className="form-inner">
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="NAME"
                            label="Klassenavn"
                            disabled={false}
                            component={renderTextField}
                        />
                        <Field
                            name="description"
                            label="Beskrivelse"
                            disabled={false}
                            component={renderMultiTextField}
                        />
                        <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                        <RaisedButton className="form-button" label="Endre klasse" disabled={true}/>
                        <RaisedButton className="form-button" label="Tilbakestill" disabled={false} onClick={handleClear}/>
                    </form>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        initialValues: state.classFormReducer.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(reduxForm({
    form: 'EditClassForm',
    validate,
})(EditClassForm));
