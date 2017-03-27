import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {renderTextField, renderMultiTextField} from './../../render.jsx';

class ClassInForm extends React.Component {

    render() {
        const {handleSubmit, handleEdit, handleClear, classes} = this.props;
        return (
            <MuiThemeProvider>
                <Paper className="form-inner">
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="NAME"
                            label="Klassenavn"
                            disabled={true}
                            component={renderTextField}
                        />
                        <Field
                            name="description"
                            label="Beskrivelse"
                            disabled={true}
                            component={renderMultiTextField}
                        />
                        <RaisedButton className="form-button" type="submit" label="Lagre" disabled={true}/>
                        <RaisedButton className="form-button" secondary={true} label="Endre klasse" disabled={false} onClick={handleEdit}/>
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
    form: 'ClassInForm',
    enableReinitialize: true
})(ClassInForm));
