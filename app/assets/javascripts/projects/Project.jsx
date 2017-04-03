import React from 'react';
import {connect} from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';


//Importing other react components (child   component) for presentational purposes.
//This component (parent component / container) get the information that is going
//to be viewed from Redux, and passing it down with props to the child components.
import RequirementListItemMiniDelete from '../requirements/presentational/RequirementListItemMiniDelete.jsx'
import RequirementListItemMiniAdd from '../requirements/presentational/RequirementListItemMiniAdd.jsx'

//Importing the methods declared in redux/actions. These methodes handles the global state of the app.
//Some of these methods uses axios to get and send data to the DB. (GET/POST requiests).
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { getRequirementsByProjectId } from "../redux/actions/projectActions.jsx";
import { getAllRequirements } from '../redux/actions/requirementActions.jsx';
import { postRequirementToProject } from '../redux/actions/projectActions.jsx';
import { deleteRequirementToProject } from '../redux/actions/projectActions.jsx';



class Project extends React.Component {
    constructor(props){
        super(props);

        //When onClickHandler gets passed down as a prop to a child component(RequirementListItem). All 'this' syntax will still refere to the parent component, This component ,Project.
        //Every method that do logic in a parent component, that is passed down, needs to use the bind function like this so that the passed down function don´t
        //refere to this in child component.
        this.addRequirementHandler = this.addRequirementHandler.bind(this);
        this.deleteRequirementHandler = this.deleteRequirementHandler.bind(this);
    }

    //This is a lifecycle method that runs after the render function. It is good practis to call on GET methods here because we want to render
    //the component first, THEN fill it with information from DB.
    componentDidMount() {
        //react-routes make us able to get the id of the URL with: this.props.params.id
        this.props.getRequirementsByProjectId(this.props.params.id);
        this.props.getAllRequirements();
    }

    //This gets called before render, methods that the render component dont depend on can get called here.
    //ChangeSideMenuMode changes the stats of the sidemenu. The sidemenu automatically rerenders when this gets called.
    componentWillMount(){
        this.props.changeSideMenuMode("FILTER")
    }


    //Since we are are going to render this BEFORE we call getRequirementByProjectId we need to make an if statement to handle when the projectRequirement only have the
    //default value. This default value is whats got defined in the projectRequirement field of the projectReducer. SEE redux folder.
    renderProjectRequirementList(){
        if(this.props.projectRequirements != null){
            //The map function works as a for loop. Check ECMAScript (ES6) for syntax stuff.
            return this.props.projectRequirements.map((item, index) => {
                    return <RequirementListItemMiniDelete key={index} requirement={item} onClickHandler={this.deleteRequirementHandler} />
                }
            )
        }else{
            return (
                    <tr>
                        <td>Henter prosjekt kravliste...</td>
                    </tr>
                )
        }
    }

    renderAllRequirementList(){
        if(this.props.allRequirements != null){
            return this.props.allRequirements.map((item, index) => {
                    return <RequirementListItemMiniAdd key={index} requirement={item} onClickHandler={this.addRequirementHandler}/>
                }
            )
        }else{
            return (
                <tr>
                    <td>Henter kravliste...</td>
                </tr>
            )
        }
    }

    //Uses axios to send post requests.
    addRequirementHandler(requirement){
        let post = {
            PID: this.props.params.id,
            RID: requirement.RID,
            reqNo: requirement.reqNo,
            reqCode: requirement.reqCode,
            comment: requirement.comment,
            description: requirement.description
        };

       this.props.postRequirementToProject(post);
    }

    deleteRequirementHandler(requirement){
        let post = {
            PID: this.props.params.id,
            RID: requirement.RID,
        };

        this.props.deleteRequirementToProject(post);
        console.log("delete", post.RID, "Of", post.PID)
    }

    //Renders the component
    //This component returns a JSX tag, and all code need to be inside this tag. JSX looks like html but is really a javascript extension syntax.
    //This get compiled into javascript and then into html. CodeAcademy.com Rect.js part 1 explains this in module 1.
    render() {
        return (
            <div className="container">
                <div className="add-requirements">
                    <h2>Legg til Krav</h2>
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>Navn</TableHeaderColumn>
                                <TableHeaderColumn>Beskrivelse</TableHeaderColumn>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                        >
                            {this.renderAllRequirementList()}
                        </TableBody>
                    </Table>
                </div>
                <div className="project-requirements">
                    <h2>Prosjekt Krav</h2>
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>Navn</TableHeaderColumn>
                                <TableHeaderColumn>Beskrivelse</TableHeaderColumn>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                        >
                        {this.renderProjectRequirementList()}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

//This maps the state from the reducer to the props in this component so that you can use the data as if it where this components state.
const mapStateToProps = (state) => {
    return {
        allRequirements: state.requirementReducer.requirements,
        projectRequirements: state.projectReducer.projectRequirements
    };
};

//This maps the actions you need from redux/actions to props of this component
const mapDispatchToProps = (dispatch) => {
    return {
        getAllRequirements: () => {
            dispatch(getAllRequirements())
        },
        getRequirementsByProjectId: (id) => {
            dispatch(getRequirementsByProjectId(id))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
        postRequirementToProject: (post) => {
            dispatch(postRequirementToProject(post))
        },
        deleteRequirementToProject: (post) => {
            dispatch(deleteRequirementToProject(post))
        }
    };
};

//This connects this component to Redux so that you can use the Actions and get access to global state.
export default connect(mapStateToProps, mapDispatchToProps)(Project);