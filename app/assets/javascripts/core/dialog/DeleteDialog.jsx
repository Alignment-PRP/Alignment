import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class DeleteDialog extends React.Component {

    render() {
        const { title, desc, open, action, onRequestClose } = this.props;
        const actions = [
            <RaisedButton
                label="Slett"
                secondary={true}
                onClick={action}
            />,
            <FlatButton
                label="Avbryt"
                primary={true}
                onClick={onRequestClose}
            />
        ];
        return (
            <Dialog title={title} actions={actions} open={open} modal={false} onRequestClose={onRequestClose} >
                {desc}
            </Dialog>
        );
    }

}

export default DeleteDialog;