import React from 'react';
import Dialog from 'material-ui/Dialog';
import ProjectReqForm from './../form/ProjectReqForm';
import {List, ListItem} from "material-ui";

class ReqInfoDialog extends React.Component {

    render() {
        const { reqInfo, open, onRequestClose } = this.props;
        return (
            <Dialog title={reqInfo.name}
                    open={open}
                    modal={false}
                    onRequestClose={onRequestClose}
                    autoDetectWindowHeight={false}
                    autoScrollBodyContent={false}
                    Style={{width: "100%"}}
            >
                <div className="form-inner">
                    <List>
                        <div className="form-field-row">
                            <ListItem
                                primaryText="Kommentar"
                                secondaryText={reqInfo.comment}
                            />
                        </div>
                        <div className="form-field-row">
                            <ListItem
                                primaryText="Beskrivelse"
                                secondaryText={reqInfo.description}
                            />
                        </div>
                        <div className="form-field-row">
                            <ListItem/>
                                primaryText="Brukerkanal: "
                            <ListItem/>
                                primaryText="Transaskjonsvolum: "
                        </div>
                        <div className="form-field-row">
                            <ListItem/>
                                primaryText="Brukerkanal: "
                            <ListItem/>
                                primaryText="Transaskjonsvolum: "
                        </div>
                        <div className="form-field-row">
                            <ListItem/>
                                primaryText="Brukerkanal: "
                            <ListItem/>
                                primaryText="Transaskjonsvolum: "
                        </div>
                    </List>
                </div>
            </Dialog>
        );
    }

}

export default ReqInfoDialog;
