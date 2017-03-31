import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

/**
 * Contains functions for rendering and
 * form-validation to use in redux-form components.
 * @module admin/render
 */

/**
 * Sends a warning to the field if the value is not a number.
 * @param {string} value
 * @returns {string}
 */
export const warnNumberField = value => {
     if (value && !/^\d+$/.test(value)) {
         return "Må være et tall."
     }
     return null;
};

/**
 * Normalizes TextField with only numeric input.
 * @function
 * @param {string} value
 * @returns {string} onlyNumbers
 */
export const normalizeNumberField = value => {
    if (!value) return value;
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return onlyNumbers;
};

/**
 * Validates {@link ProjectForm}.
 * @see {@link ProjectForm}
 * @function
 * @param {Project} values
 * @returns {{}}
 */
export const validateProjectForm = (values) => {
    const errors = {};
    const requiredFields = [ 'name', 'securityLevel', 'transactionVolume', 'userChannel', 'deploymentStyle', 'isPublic' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Må fylles'
        }
        if (field === 'securityLevel' && !/^\d+$/.test(values[field])) {
            errors[ field ] = "Må være et tall."
        }
    });
    return errors
};

/**
 * Validates {@link CreateClassForm} and {@link EditClassForm}.
 * @see {@link CreateClassForm}
 * @function
 * @param {UserClass} values
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
 * @function
 * @param {UserClass} values
 * @param {string} values.replacement
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
 * @function
 * @param {User} values
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
 * @function
 * @param {User} value
 * @param {string} values.pass
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
 * @function
 * @param {Array.<UserClass>} classes
 */
export const menuItemsClasses = (classes) => {
    return classes.map((item, index) => {
        return <MenuItem key={index} value={item.NAME} primaryText={item.NAME}/>
    })
};

/**
 * Renders a SelectField from Material-UI.
 * Redux-form injects parameters.
 * @function
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
 * @function
 * @param {Array} input
 * @param {string} label
 * @param {boolean} touched
 * @param {string} error
 * @param {string} warning
 * @param {Array} custom
 */
export const renderTextField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={(touched && error) || warning}
               {...input}
               {...custom}
    />
);

/**
 * Renders a TextField from Material-UI with multiLine={true}.
 * Redux-form injects parameters.
 * @function
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

/**
 * Renders a TextField from Material-UI with type="password".
 * Redux-form injects parameters.
 * @function
 * @param input
 * @param label
 * @param touched
 * @param error
 * @param custom
 */
export const renderPassField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
               type="password"
               {...input}
               {...custom}
    />
);

/**
 * Renders a CheckBox from Material-UI.
 * Redux-form injects arguments.
 * @function
 * @param input
 * @param label
 * @param touched
 * @param error
 * @param custom
 */
export const renderCheckbox = ({ input, label, meta: { touched, error }, ...custom }) => (
    <Checkbox label={label}
              checked={input.value ? true : false}
              onCheck={input.onChange}
              {...custom}
    />
);
