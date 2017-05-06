import React from 'react';
import Dialog from 'material-ui/Dialog';
import ProjectReqForm from './../form/ProjectReqForm';

class ProReqUpdateDialog extends React.Component {

    render() {
        const { handleSubmit, title, open, onRequestClose } = this.props;
        return (
            <Dialog title={title}
                    open={open}
                    modal={false}
                    onRequestClose={onRequestClose}
                    autoDetectWindowHeight={false}
                    autoScrollBodyContent={false}
                    Style={{width: "100%"}}
            >
                <ProjectReqForm onSubmit={handleSubmit} disabled={false} handleClose={onRequestClose}/>
            </Dialog>
        );
    }

}

export default ProReqUpdateDialog;
