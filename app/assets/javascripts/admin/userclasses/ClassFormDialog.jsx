import React from 'react';
import Dialog from 'material-ui/Dialog';
import ClassForm from './ClassForm';

class ClassFormDialog extends React.Component {

    render() {
        const { title, open, onRequestClose, classes, handleSubmit } = this.props;
        return (
            <Dialog title={title} open={open} modal={false} onRequestClose={onRequestClose}>
                <ClassForm onSubmit={handleSubmit} classes={classes} handleClose={onRequestClose}/>
            </Dialog>
        );
    }

}

export default ClassFormDialog;