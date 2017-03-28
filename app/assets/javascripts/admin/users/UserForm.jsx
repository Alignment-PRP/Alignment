import React from 'react';
import EmptyUserForm from './userform/EmptyUserForm.jsx';
import UserInForm from './userform/UserInForm.jsx';
import EditUserForm from './userform/EditUserForm.jsx';
import CreateUserForm from './userform/CreateUserForm.jsx';

export default class UserForm extends React.Component {

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
