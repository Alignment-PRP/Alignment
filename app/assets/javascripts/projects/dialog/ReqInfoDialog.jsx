import React from 'react';
import Dialog from 'material-ui/Dialog';
import {List, ListItem, RaisedButton} from "material-ui";

class ReqInfoDialog extends React.Component {

    render() {
        const { reqInfo, open, onRequestClose } = this.props;
        return (
            <Dialog title={reqInfo.name}
                    open={open}
                    modal={false}
                    onRequestClose={onRequestClose}
                    autoDetectWindowHeight={false}
                    autoScrollBodyContent={true}
                    style={{width: "100%"}}
            >
                <List>
                    <div className="form-inner">
                        <div className="form-field-row">
                            <ListItem
                                primaryText="reqResponsible"
                                secondaryText={reqInfo.reqResponsible}
                            />
                            <ListItem
                                primaryText="reqCode"
                                secondaryText={reqInfo.reqCode}
                            />
                            <ListItem
                                primaryText="reqNo"
                                secondaryText={reqInfo.reqNo}
                            />
                        </div>
                    </div>
                </List>
                        <h4>Beskrivelse</h4>
                        <p>{reqInfo.description}</p>
                        <h4>Kommentar</h4>
                        <p>{reqInfo.comment}</p>
                <div className="form-button-row">
                    <RaisedButton className="form-button" style={{marginLeft: 'auto'}} secondary={true} label="Lukk" onClick={onRequestClose}/>
                </div>
            </Dialog>
        );
    }

}

export default ReqInfoDialog;
