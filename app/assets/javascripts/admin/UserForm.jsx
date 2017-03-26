import React from 'react';
import EmptyForm from './userform/EmptyForm.jsx';
import UserInForm from './userform/UserInForm.jsx';
import EditUserForm from './userform/EditUserForm.jsx';
import CreateUserForm from './userform/CreateUserForm.jsx';

export default class UserForm extends React.Component {

    render() {
        const { handleSubmit, handleEdit, handleCreate, handleSubmitCreate, handleClear, mode, user, classes} = this.props;
        switch(mode) {
            case "EMPTY":
                return <EmptyForm onSubmit={handleSubmit} handleCreate={handleCreate}/>;
            case "SHOW":
                return <UserInForm onSubmit={handleSubmit} handleEdit={handleEdit} handleClear={handleClear} user={user}/>;
            case "EDIT":
                return <EditUserForm onSubmit={handleSubmit} handleClear={handleClear} user={user} classes={classes}/>;
            case "CREATE":
                return <CreateUserForm onSubmit={handleSubmitCreate} handleClear={handleClear} classes={classes}/>;
            default:
                return(<p>potato</p>)
        }
    }

}
