import React from 'react';
import Dialog from 'material-ui/Dialog';
import ProjectForm from './../form/ProjectForm';

class ProjectEditAddDialog extends React.Component {

    render() {
        const { handleSubmit, title, open, onRequestClose, users } = this.props;
        return (
            <Dialog title={title} open={open} modal={false} onRequestClose={onRequestClose} autoScrollBodyContent={true}>
                <ProjectForm onSubmit={handleSubmit} disabled={false} handleClose={onRequestClose} users={users}/>
            </Dialog>
        );
    }

}

export default ProjectEditAddDialog;
