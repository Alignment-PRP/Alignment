import React from 'react';

import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class NewProject extends React.Component {

    componentDidMount(){
        this.props.changeSideMenuMode("NEW_PROJECT_MENU");
    }

    render() {
        return (
                <form action="/projects" method="post">
                    <h1>Nytt Prosjekt</h1>
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
