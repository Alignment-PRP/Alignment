import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * Contains functions for rendering and
 * form-validation to use in redux-form components.
 * @module admin/render
 */

/**
 * Validates {@link CreateClassForm} and {@link EditClassForm}.
 * @see {@link CreateClassForm}
 * @param values
 * @returns {{}}
 */
export const validateClassForm = values => {
    const errors = {};
    const requiredFields = [ 'NAME', 'description' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
    });
    return errors
};

/**
 * Validates {@link ClassInForm} when delete is pressed.
 * @param values
 * @returns {{}}
 */
export const validateDeleteClassForm = values => {
    const errors = {};
    const requiredFields = [ 'NAME', 'description', 'replacement' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
    });
    return errors
};

/**
 * Validates {@link EditUserForm}.
 * @param values
 * @returns {{}}
 */
export const validateUserForm = values => {
    const errors = {};
    const requiredFields = [ 'USERNAME', 'firstName', 'lastName', 'email', 'ucName' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ugyldig epost'
    }
    return errors
};

/**
 * Validates {@link CreateUserForm}.
 * @param values
 * @returns {{}}
 */
export const validateUserFormPass = values => {
    const errors = {};
    const requiredFields = [ 'USERNAME', 'firstName', 'lastName', 'email', 'ucName', 'pass' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ugyldig epost'
    }
    return errors
};

/**
 * Maps UserClasses to MenuItem components.
 * @param classes
 */
export const menuItemsClasses = (classes) => {
    return classes.map((item, index) => {
        return <MenuItem key={index} value={item.NAME} primaryText={item.NAME}/>
    })
};

/**
 * Renders a SelectField from Material-UI.
 * Redux-form injects parameters.
 * @param input
 * @param label
 * @param touched
 * @param error
 * @param children
 * @param custom
 */
export const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
);

/**
 * Renders a TextField from Material-UI.
 * Redux-form injects parameters.
 * @param input
 * @param label
 * @param touched
 * @param error
 * @param custom
 */
export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
);

/**
 * Renders a TextField from Material-UI with multiLine={true}.
 * Redux-form injects parameters.
 * @param input
 * @param label
 * @param touched
 * @param error
 * @param custom
 */
export const renderMultiTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               multiLine={true}
               style={{width: '256px'}}
               floatingLabelText={label}
               errorText={touched && error}
               {...input}
               {...custom}
    />
);

export const renderPassField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               type="password"
               {...input}
               {...custom}
    />
);
