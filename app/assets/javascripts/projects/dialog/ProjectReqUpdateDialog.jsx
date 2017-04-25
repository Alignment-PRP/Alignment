import React from 'react';
import Dialog from 'material-ui/Dialog';
import ProjectReqForm from './../form/ProjectReqForm';

class ProjectReqUpdateDialog extends React.Component {

    render() {
        const { handleSubmit, title, open, onRequestClose } = this.props;
        return (
            <Dialog title={title} open={open} modal={false} onRequestClose={onRequestClose} >
                <ProjectReqForm onSubmit={handleSubmit} disabled={false} handleClose={onRequestClose}/>
            </Dialog>
        );
    }

}

export default ProjectReqUpdateDialog;
