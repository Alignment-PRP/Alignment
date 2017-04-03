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
                    <label><b>Sikkerhetsnivå</b></label><br/>
                    <input type="number" placeholder="" name="securityLevel" required/>

                    <br/>
                    <label><b>Transaksjonsvolum</b></label><br/>
                    <input type="text" placeholder="" name="transactionVolume" required/>

                    <br/>
                    <label><b>Brukerkanal</b></label><br/>
                    <input type="text" placeholder="" name="userChannel" required/>

                    <br/>
                    <label><b>Utplasseringsstil</b></label><br/>
                    <input type="text" placeholder="" name="deploymentStyle" required/>

                    <br/>
                    <label><b>Offentlig prosjekt?</b></label><br/>
                      <select name="isPublic">
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
