import React from 'react';
import EmptyUserForm from './userform/EmptyUserForm';
import UserInForm from './userform/UserInForm';
import EditUserForm from './userform/EditUserForm';
import CreateUserForm from './userform/CreateUserForm';

/**
 * Class represents a multi-form.
 * Renders different components based on global state.
 * Parent: {@link Users}
 */
class UserForm extends React.Component {

    render() {
        const {
            handleSubmitUpdate, handleSubmitNew, handleSubmitDelete,
            handleEdit, handleCreate, handleClear,
            mode, classes
        } = this.props;
        switch(mode) {
            case "EMPTY":
                return <EmptyUserForm onSubmit={()=>{}} handleCreate={handleCreate}/>;
            case "SHOW":
                return <UserInForm onSubmit={handleSubmitDelete} handleEdit={handleEdit} handleClear={handleClear} classes={classes}/>;
            case "EDIT":
                return <EditUserForm onSubmit={handleSubmitUpdate} handleClear={handleClear} classes={classes}/>;
            case "CREATE":
                return <CreateUserForm onSubmit={handleSubmitNew} handleClear={handleClear} classes={classes}/>;
            default:
                return(<p>potato</p>)
        }
    }

}

export default UserForm;