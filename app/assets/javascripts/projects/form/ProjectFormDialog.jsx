import React from 'react';
import Dialog from 'material-ui/Dialog';
import ProjectForm from './ProjectForm.jsx';

class ProjectFormDialog extends React.Component {

    render() {
        const { handleSubmit, title, open, onRequestClose } = this.props;
        return (
            <Dialog title={title} open={open} modal={false} onRequestClose={onRequestClose} >
                <ProjectForm onSubmit={handleSubmit} disabled={false} handleCreate={()=>{}} handleClear={()=>{}}/>
            </Dialog>
        );
    }

}

export default ProjectFormDialog;
