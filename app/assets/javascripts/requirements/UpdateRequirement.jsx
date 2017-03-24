import React from 'react';
import * as URLS from './../config.jsx';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class UpdateRequirement extends React.Component {

	componentDidMount(){
		this.props.changeSideMenuMode("UPDATE_REQUIREMENTS_MENU");
	}

	renderCheckbox(){
        if (this.props.requirement.ispublic == "1"){
            return (<input type="checkbox" name="public" defaultChecked/>);
        }else{
            return (<input type="checkbox" name="public"/>);
        }
    }

	render() {

		return (
		    <div className="update-requirement">
		    	<form action={URLS.REQUIREMENT_POST_UPDATE} method="post">
                    <h2>Oppdater Krav</h2>

                    <label><b>KravId</b></label><br/>
                    <input type="number" defaultValue={this.props.requirement.ID} name="id" min="0" required/>

                    <br/>
                    <label><b>KravNavn</b></label><br/>
                    <input type="text" defaultValue={this.props.requirement.name} name="name" required/>

                    <br/>
                    <label><b>description</b></label><br/>
                    <input type="text" defaultValue={this.props.requirement.description} name="description" required/>

                    <br/>

                    <label> <b>Source</b></label><br/>
                    {/*<input type="text" defaultValue={this.props.requirement.source} name="source" required/>*/}

                    <br/>
                    <label><b>Stimulus</b></label><br/>
                    {/*<input type="text" defaultValue={this.props.requirement.stimulus} name="stimulus" required/>*/}

                    <br/>
                    <label> <b>Artifact</b></label><br/>
                    {/*<input type="text" defaultValue={this.props.requirement.artifact} name="artifact" required/>*/}

                    <br/>
                    <label> <b>Response</b></label><br/>
                    {/*<input type="text" defaultValue={this.props.requirement.response} name="response" required/>*/}

                    <br/>
                    <label> <b>Response measure</b></label><br/>
                    {/*<input type="text" defaultValue={this.props.requirement.responsemeasure} name="responsemeasure" required/>*/}

                    <br/>
                    <label> <b>Environment</b></label><br/>
                    {/*<input type="text" defaultValue={this.props.requirement.environment} name="environment" required/>*/}

                    <br/>
                    <label><b>Public</b></label>
                    {/* this.renderCheckbox() */}
                    <br/>
                    <button type="submit">Oppdater</button>
				</form>
            </div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
        requirement: state.requirementReducer.requirement
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequirement);
