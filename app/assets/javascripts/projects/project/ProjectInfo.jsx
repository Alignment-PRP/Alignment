import React from 'react';
import { connect } from "react-redux";
import { getProjectMetaDataById, getProjectDataById } from "../../redux/actions/projectActions";
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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

    pData() {
        let name = "";
        let managerID = "";
        let creatorID = "";
        let isPublic = "";

        if(this.props.projectData){
            this.props.projectData.map((project)=>{
                name = project.name;
                managerID = project.managerID;
                creatorID = project.creatorID;
                
            });

            return(
                <Card>
                    <CardHeader
                        title={"Leder: " + managerID}
                        subtitle={"Opprettet av: " + creatorID}
                        avatar="https://cdn2.iconfinder.com/data/icons/users-6/100/USER7-512.png"
                    />
                    <CardTitle title={name} subtitle={} />
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions>
                        <FlatButton label="Action1" />
                        <FlatButton label="Action2" />
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