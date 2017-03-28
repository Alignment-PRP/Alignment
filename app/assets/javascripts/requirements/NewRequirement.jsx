import React from 'react';
import * as URLS from './../config.jsx';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class NewRequirement extends React.Component {

	componentDidMount(){
		this.props.changeSideMenuMode("REQUIREMENTS_MENU");
	}

	render() {

		return (
		    <div className="new-requirement">
                <form action={URLS.REQUIREMENT_POST_ADD} method="post">
                    <h2>Lag nytt krav</h2>

                    <br/>

                    <label><b>KravNavn</b></label><br/>
                    <input type="text" placeholder="Kravname" name="name" required/>

                    <br/>
                    <label><b>Beskrivelse</b></label><br/>
                    <input type="text" placeholder="Beskrivelse" name="description" required/>

                    <br/>

                    <label> <b>SubCategoryID</b></label><br/>
                    <input type="text" placeholder="SubCategoryID" name="subCatID" required/>

                    <br/>
                    <label><b>reqResponsible</b></label><br/>
                    <input type="text" placeholder="reqResponsible" name="reqResponsible" required/>

                    <br/>
                    <label> <b>comment</b></label><br/>
                    <input type="text" placeholder="comment" name="comment" required/>

                    <br/>
                    <label> <b>reqCode</b></label><br/>
                    <input type="text" placeholder="reqCode" name="reqCode" required/>

                    <br/>
                    <label> <b>reqNo</b></label><br/>
                    <input type="text" placeholder="reqNo" name="reqNo" required/>

                    <br/>
                    <label><b>Public</b></label>
                    <input type="checkbox" name="public"/>
                    <br/>
                    <button type="submit">Legg til</button>
                </form>
            </div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRequirement);
