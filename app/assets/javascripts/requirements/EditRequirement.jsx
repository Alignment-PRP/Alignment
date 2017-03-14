import React from 'react';

import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class EditRequirement extends React.Component {

	componentDidMount(){
		this.props.changeSideMenuMode("MENU");
	}

	render() {
		return (
			<form action="/update-requirement" method="post">

				<label><b>KravId(OBS dette bør gjøres gjennom å få id fra et eksisterende req (GET /get-requirement)</b></label><br/>
				<input type="number" name="id" min="0" required/>

				<br/>
				<label><b>KravName</b></label><br/>
				<input type="text" placeholder="Enter Projectname" name="name" required/>

                <br/>
				<label><b>description</b></label><br/>
				<input type="text" placeholder="Enter description" name="description" required/>

                <br/>

				<label> <b>Source</b></label><br/>
				<input type="text" placeholder="Source" name="source" required/>

                <br/>
				<label><b>Stimulus</b></label><br/>
				<input type="text" placeholder="Strimulus" name="stimulus" required/>

                <br/>
				<label> <b>Artifact</b></label><br/>
				<input type="text" placeholder="Artifact" name="artifact" required/>

                <br/>
				<label> <b>Response</b></label><br/>
				<input type="text" placeholder="Response" name="response" required/>

                <br/>
				<label> <b>Environment</b></label><br/>
				<input type="text" placeholder="Environment" name="environment" required/>

                <br/>
				<label><b>Public</b></label>

                <input type="checkbox" name="public" />
                <br/>
                <button type="submit">Add requirement</button>
				</form>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRequirement);
