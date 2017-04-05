import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class RequirementDeleteDialog extends React.Component {

    render() {
        const { open, action, onRequestClose } = this.props;
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
            <Dialog title="Slett Krav" actions={actions} open={open} modal={false} onRequestClose={onRequestClose} >
                Er du sikker på at du vil slette kravet?
            </Dialog>
        );
    }

}

export default RequirementDeleteDialog;