import React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EditUserForm extends React.Component {

    constructor(props) {
        super(props);

        this.classChange = this.classChange.bind(this);

        this.state = {
            value: this.props.user.ucName
        }
    }

    classChange(event, value) {
        this.setState({value: value});
    }

    menuItems(classes) {
        return classes.map((item, index) => {
            return <option value={item.NAME}>{item.NAME}</option>
        })
    }

    rrender(handleSubmit, user, classes) {
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        defaultValue={user.USERNAME}
                        floatingLabelText="Brukernavn"
                        disabled={false}
                        component={TextField}
                    />
                    <Field
                        name="email"
                        defaultValue={user.email}
                        floatingLabelText="Epost"
                        disabled={false}
                        component={TextField}
                    />
                    <br/>
                    <Field
                        name="firstname"
                        defaultValue={user.firstName}
                        floatingLabelText="Fornavn"
                        disabled={false}
                        component={TextField}
                    />
                    <Field
                        name="lastname"
                        defaultValue={user.lastName}
                        floatingLabelText="Etternavn"
                        disabled={false}
                        component={TextField}
                    />
                    <Field
                        name="ucName"
                        component="select"
                        onChange={this.classChange}
                    >
                        <option value={this.state.value}>{this.state.value}</option>
                        {this.menuItems(classes.filter(e => e.NAME != this.state.value))}
                    </Field>
                    <br/>
                    <Field
                        disabled={false}
                        type="submit"
                        label="Submit"
                        component={RaisedButton}
                    />
                    <Field
                        disabled={true}
                        type="edit"
                        label="Endre"
                        component={RaisedButton}
                    />
                </form>
            </MuiThemeProvider>
        );
    }

    render() {
        const {onSubmit, user, classes} = this.props;
        return this.rrender(onSubmit, user, classes);
    }

}
