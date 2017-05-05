import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from './redux/actions/userActions';

class Home extends React.Component {

    componentDidMount() {
        this.props.getUserData();
    }

    UserData() {
        if (this.props.userdata) {
            const {USERNAME, ucDesc, ucName} = this.props.userdata;
            return (
                <div id="user-info">
                    <p><b>Username:</b> {USERNAME} </p>
                    <p><b>Userclass:</b> {ucName} - {ucDesc} </p>
                </div>
            )
        } else {
            return (
                <div id="user-info">
                    <p>Loading userdata</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div id="home">
                <h2>Velkommen</h2>
                <div>
                    <p>
                        Alignment er en webplatform for effektivisering av prosjektutarbeiding.<br/>
                        Alignment gjør det lettere å finne relevante kvalitetskrav for IT prosjekter i Trondheim
                        Kommune.
                    </p>
                    <p>
                        Under <b>Prosjekter</b> kan du opprette et prosjekt og legge til kvalitetskrav. Her kan du også
                        gi andre brukere <br/>
                        tilgang til prosjektet ditt for å lese og redigere
                        kvalitets-kravene.
                    </p>
                    <p>
                        Under <b>Krav</b> kan du søke, legge til og redigere krav
                    </p>
                    <p>
                        I <b>Admin</b>panelet kan du søke, legge til og redigere brukere og administrerer brukerrettighetert
                    </p>
                </div>
                {/*this.UserData()*/}
                <div>
                    <p>Arbeidsflyt</p>
                    <ul>
                        <ol>1. Lag et prosjekt</ol>
                        <ol>2. Legg til krav</ol>
                        <ol>3. Legge til brukere som har tilgang til prosjektet</ol>
                    </ul>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userdata: state.userReducer.userdata
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: () => dispatch(getUserData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
