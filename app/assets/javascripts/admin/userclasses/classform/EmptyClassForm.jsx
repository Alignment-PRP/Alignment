import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {renderTextField, renderMultiTextField} from './../../render.jsx';

/**
 * Redux-form for displaying an empty form with class related fields.
 */
class EmptyClassForm extends React.Component {

    render() {
        const {handleSubmit, handleCreate} = this.props;
        return(
            <MuiThemeProvider>
                <Paper className="form-inner">
                    <h2>Brukerklasse</h2>
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
                        <RaisedButton className="form-button" secondary={true} label="Lag klasse" disabled={false} onClick={handleCreate}/>
                        <RaisedButton className="form-button" label="Tilbakestill" disabled={true}/>
                    </form>
                </Paper>
            </MuiThemeProvider>
        );
    }

}

export default reduxForm({
    form: 'EmptyClassForm',
})(EmptyClassForm);
