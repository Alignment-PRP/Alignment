import React from 'react';
import {connect} from 'react-redux'
import ProjectRequirements from '../requirements/ProjectRequirements.jsx';
import { getProjectById } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import Filter from '../sidemenu/Filter.jsx'


class Project extends React.Component {
    constructor(props){
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount() {
        this.props.getProjectById(this.props.params.id);
        this.props.changeSideMenuMode("HIDE");
    }

    renderProject(){
        let id = "";
        let name = "";
        let desc = "";

        this.props.project.map((item)=>{
            id = item.projectid;
            name = item.name;
            desc = item.description;
        });

        return(
            <div className="singleProject">
                <h1>{name}</h1>
                <p>ID: {id}</p>
                <p>Beskrivelse:{desc}</p>
            </div>

        );
    }

    handleOnClick(){
        $(button).on("sidemenu").hide();

    }

    render() {
        return (
            <div className="container">
                <Filter />
                {this.renderProject()}
                <div className="projectRequirements">
                    <ProjectRequirements id={this.props.params.id}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.projectReducer.project
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectById: (id) => {
            dispatch(getProjectById(id))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);