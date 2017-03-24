import React from 'react';
import * as URLS from './../config.jsx';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class NewProject extends React.Component {

    componentDidMount(){
        this.props.changeSideMenuMode("NEW_PROJECT_MENU");
    }

    render() {
        return (
            <div className="new-project">
                <form action={URLS.PROJECT_POST_NEW} method="post">
                    <h2>Nytt Prosjekt</h2>
                    <label><b>Prosjektnavn</b></label><br/>
                    <input type="text" placeholder="" name="name" required/>

                    <br/>

                    <label><b>Prosjektbeskrivelse</b></label><br/>
                    <input type="text" placeholder="" name="desc" required/>

                    <br/>

                    <label><b>Public prosjekt?</b></label><br/>
                      <select name="ispublic">
                        <option value="1">Ja</option>
                        <option value="0">Nei</option>
                      </select>

                    <br/>

                    <button type="submit">Legg til</button>
                </form>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
