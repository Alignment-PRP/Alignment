import React from 'react';
import EmptyClassForm from './classform/EmptyClassForm';
import ClassInForm from './classform/ClassInForm';
import EditClassForm from './classform/EditClassForm';
import CreateClassForm from './classform/CreateClassForm';

/**
 * Class represents a multi-form.
 * Renders different components based on global state.
 * Parent: {@link Classes}
 */
class ClassForm extends React.Component {

    render() {
        const {
            handleSubmitUpdate, handleSubmitNew, handleSubmitDelete,
            handleEdit, handleCreate, handleClear,
            mode, classes
        } = this.props;
        switch(mode) {
            case "EMPTY":
                return <EmptyClassForm onSubmit={()=>{}} handleCreate={handleCreate}/>;
            case "SHOW":
                return <ClassInForm onSubmit={handleSubmitDelete} handleEdit={handleEdit} handleClear={handleClear} classes={classes}/>;
            case "EDIT":
                return <EditClassForm onSubmit={handleSubmitUpdate} handleClear={handleClear}/>;
            case "CREATE":
                return <CreateClassForm onSubmit={handleSubmitNew} handleClear={handleClear} classes={classes}/>;
            default:
                return(<p>potato</p>)
        }
    }

}

export default ClassForm;
