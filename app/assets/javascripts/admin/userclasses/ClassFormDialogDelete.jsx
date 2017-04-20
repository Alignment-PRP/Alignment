import React from 'react';
import Dialog from 'material-ui/Dialog';
import ClassFormDelete from './ClassFormDelete';

class ClassFormDialogDelete extends React.Component {

    render() {
        const { title, open, onRequestClose, classes, handleSubmit } = this.props;
        return (
            <Dialog title={title} open={open} modal={false} onRequestClose={onRequestClose}>
                <ClassFormDelete onSubmit={handleSubmit} classes={classes} handleClose={onRequestClose}/>
            </Dialog>
        );
    }

}

export default ClassFormDialogDelete;