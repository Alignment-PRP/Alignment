import React from 'react';
import { connect } from "react-redux";
import { getProjectMetaDataById, getProjectDataById } from "../../redux/actions/projectActions";
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
class ProjectInfo extends React.Component {

    componentDidMount() {
        this.props.getProjectMetaDataById(this.props.id);
        this.props.getProjectDataById(this.props.id);

    }

    pMeta() {
        const style = {
            height: 150,
            width: 200,
            margin: 20,
            lineheight: 50,
            display: 'inline-block',
        };
        let securityLevel = "";
        let deploymentStyle = "";
        let userChannel = "";
        let PID = "";
        let transactionVolume = "";
        if(this.props.projectMeta) {
            this.props.projectMeta.map((project) => {
                securityLevel = project.securityLevel;
                deploymentStyle = project.deploymentStyle;
                userChannel = project.userChannel;
                PID = project.PID;
                transactionVolume = project.transactionVolume;
            });
            return (
                <div>
                    <Divider />
                    <List>
                        <ListItem
                            primaryText="Prosjekt-ID: "
                            secondaryText={
                            <p>
                                {PID}
                            </p>
                        }/>
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

    pData() {
        let name = "";
        let managerID = "";
        let creatorID = "";
        let isPublic = "";
        let description = "";

        if(this.props.projectData){
            this.props.projectData.map((project)=>{
                name = project.name;
                managerID = project.managerID;
                creatorID = project.creatorID;
                description = project.description;
                if(project.isPublic == "1"){
                    isPublic = "Offentlig";
                }
                else{
                    isPublic = "Privat";
                }
            });

            return(
                <Card>
                    <CardHeader
                        title={"Leder: " + managerID}
                        subtitle={"Opprettet av: " + creatorID}
                        avatar="https://cdn2.iconfinder.com/data/icons/users-6/100/USER7-512.png"
                    />
                    <CardTitle title={name} subtitle={isPublic} />
                    <CardText>
                        {description}<br/><br/>
                        {this.pMeta()}

                    </CardText>
                    <CardActions>
                        <FlatButton label="Rediger" />
                    </CardActions>
                </Card>
            )
        }else {
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
                {this.pData()}
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);