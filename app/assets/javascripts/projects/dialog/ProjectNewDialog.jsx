import React from 'react';
import Dialog from 'material-ui/Dialog';
import ProjectForm from './../form/ProjectForm';

class ProjectNewDialog extends React.Component {

    render() {
        const { handleSubmit, title, open, onRequestClose } = this.props;
        return (
            <Dialog title={title} open={open} modal={false} onRequestClose={onRequestClose} >
                <ProjectForm onSubmit={handleSubmit} disabled={false} handleClose={onRequestClose}/>
            </Dialog>
        );
    }

}

export default ProjectNewDialog;
