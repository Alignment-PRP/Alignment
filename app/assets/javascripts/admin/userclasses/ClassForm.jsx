import React from 'react';
import EmptyForm from './classform/EmptyForm.jsx';
import ClassInForm from './classform/ClassInForm.jsx';
import EditClassForm from './classform/EditClassForm.jsx';
import CreateClassForm from './classform/CreateClassForm.jsx';

export default class ClassForm extends React.Component {

    render() {
        const { handleSubmit, handleEdit, handleCreate, handleSubmitCreate, handleDelete, handleClear, mode, uclass, classes} = this.props;
        switch(mode) {
            case "EMPTY":
                return <EmptyForm onSubmit={handleSubmit} handleCreate={handleCreate}/>;
            case "SHOW":
                return <ClassInForm onSubmit={handleDelete} handleEdit={handleEdit} handleClear={handleClear} uclass={uclass} classes={classes}/>;
            case "EDIT":
                return <EditClassForm onSubmit={handleSubmit} handleClear={handleClear} uclass={uclass} classes={classes}/>;
            case "CREATE":
                return <CreateClassForm onSubmit={handleSubmitCreate} handleClear={handleClear} classes={classes}/>;
            default:
                return(<p>potato</p>)
        }
    }

}
