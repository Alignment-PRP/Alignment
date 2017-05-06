/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
import React from 'react';
import { connect } from "react-redux";
import { getProjectMetaDataById, getProjectDataById, initEditProjectForm } from "../../redux/actions/projectActions";
import { dialogOpen } from '../../redux/actions/dialogActions';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {RaisedButton} from "material-ui";

class ProjectInfo extends React.Component {

    componentDidMount() {
        this.props.getProjectMetaDataById(this.props.id);
        this.props.getProjectDataById(this.props.id);
    }

    renderProjectMeta() {
        if(this.props.projectMeta) {
            const { securityLevel, deploymentStyle, userChannel, transactionVolume } = this.props.projectMeta;
            return (
                <div>
                    <Divider />
                    <List>
                        <ListItem
                            primaryText="Sikkerhetsnivå: "
                            secondaryText={
                                <p>
                                    {securityLevel}
                                </p>
                            }/>
                        <ListItem
                            primaryText="Deploymentstil: "
                            secondaryText={
                                <p>
                                    {deploymentStyle}
                                </p>
                            }/>
                        <ListItem
                            primaryText="Brukerkanal: "
                            secondaryText={
                                <p>
                                    {userChannel}
                                </p>
                            }/>
                        <ListItem
                            primaryText="Transaskjonsvolum: "
                            secondaryText={
                                <p>
                                    {transactionVolume}
                                </p>
                            }/>
                    </List>
                </div>
            )
        }
        else{
            return (
                <div>
                    <CircularProgress/>
                </div>
            )
        }
    }

    renderProjectData() {
        if(this.props.projectData){
            const { name, managerID, creatorID, description, isPublic } = this.props.projectData;
            return(
                <Card>
                    <CardHeader
                        title={"Leder: " + managerID}
                        subtitle={"Opprettet av: " + creatorID}
                        avatar="https://cdn2.iconfinder.com/data/icons/users-6/100/USER7-512.png"
                    />
                    <CardTitle title={name} subtitle={isPublic === '1' ? 'Offentlig' : 'Privat'} />
                    <CardText>
                        {description}<br/><br/>
                        {this.renderProjectMeta()}

                    </CardText>
                    <CardActions>
                        <RaisedButton primary={true} onClick={() => {
                            this.props.editDialog(true);
                            this.props.initEditProjectForm(this.props.projectData, this.props.projectMeta);
                        }} label="Rediger" />
                    </CardActions>
                </Card>
            )
        } else {
            return (
                <div >
                    <CircularProgress/>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                {this.renderProjectData()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projectData: state.projectReducer.projectData,
        projectMeta: state.projectReducer.projectMeta
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectMetaDataById: (id) => {
            dispatch(getProjectMetaDataById(id));
        },
        getProjectDataById: (id) => {
            dispatch(getProjectDataById(id));
        },
        editDialog: (open) => {
            dispatch(dialogOpen('projectEdit', open))
        },
        initEditProjectForm: (projectData, projectMeta) => {
            dispatch(initEditProjectForm(projectData, projectMeta))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);