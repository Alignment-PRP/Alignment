import React from 'react';
import Dialog from 'material-ui/Dialog';
import RequirementForm from './RequirementForm.jsx';

class RequirementFormDialog extends React.Component {

    render() {
        const { handleSubmit, title, open, onRequestClose } = this.props;
        return (
            <Dialog title={title} open={open} modal={false} onRequestClose={onRequestClose} >
                <RequirementForm onSubmit={handleSubmit} disabled={false} handleCreate={()=>{}} handleClear={()=>{}}/>
            </Dialog>
        );
    }

}

export default RequirementFormDialog;
