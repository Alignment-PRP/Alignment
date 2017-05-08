import React from 'react';
import Dialog from 'material-ui/Dialog';
import {Divider, ListItem, RaisedButton} from "material-ui";

class ReqInfoDialog extends React.Component {

    /**
     * @param {Requirement} requirement
     * @returns {Array}
     */
    renderStructure(requirement) {
        if (requirement.structures) {
            return requirement.structures.map(struc =>
                <ListItem
                    primaryText={struc.type}
                    secondaryText={<p style={{maxWidth: '512px'}}>{struc.content}</p>}
                />
            )
        }
        return null
    }

    render() {
        const { requirement, open, onRequestClose } = this.props;
        return (
            <Dialog title={requirement.name}
                    open={open}
                    modal={false}
                    onRequestClose={onRequestClose}
                    autoDetectWindowHeight={false}
                    autoScrollBodyContent={true}
                    style={{width: "100%"}}
            >
                <div className="form-field-row">
                    <ListItem
                        primaryText="Ansvarlig"
                        secondaryText={requirement.reqResponsible}
                    />
                    <ListItem
                        primaryText="Kode"
                        secondaryText={requirement.reqCode}
                    />
                    <ListItem
                        primaryText="Nummer"
                        secondaryText={requirement.reqNo}
                    />
                    <ListItem
                        primaryText="Kategori"
                        secondaryText={requirement.cName + ' - ' + requirement.scName}
                    />
                </div>
                <Divider/>
                <div className="form-field-row" style={{flexWrap: 'wrap'}}>
                    {this.renderStructure(requirement)}
                </div>

                <h4>Beskrivelse</h4>
                <p>{requirement.description}</p>
                <h4>Kommentar</h4>
                <p>{requirement.comment}</p>
                <div className="form-button-row">
                    <RaisedButton className="form-button" style={{marginLeft: 'auto'}} secondary={true} label="Lukk" onClick={onRequestClose}/>
                </div>
            </Dialog>
        );
    }

}

export default ReqInfoDialog;
