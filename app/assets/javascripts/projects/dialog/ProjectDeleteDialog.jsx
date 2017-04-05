import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class ProjectDeleteDialog extends React.Component {

    render() {
        const { open, action, onRequestClose } = this.props;
        console.log(open);
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
            <Dialog title="Slett Prosjekt" actions={actions} open={open} modal={false} onRequestClose={onRequestClose} >
                Er du sikker på at du vil slette prosjektet?
            </Dialog>
        );
    }

}

export default ProjectDeleteDialog;