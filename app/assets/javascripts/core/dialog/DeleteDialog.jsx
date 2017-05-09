import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class DeleteDialog extends React.Component {

    render() {
        const { title, desc, open, action, onRequestClose } = this.props;
        const actions = [
            <FlatButton
                label="Avbryt"
                secondary={true}
                onClick={onRequestClose}
            />,
            <RaisedButton
                style={{marginLeft: '8px'}}
                label="Slett"
                primary={true}
                onClick={action}
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