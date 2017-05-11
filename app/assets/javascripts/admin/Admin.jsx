import React from 'react';
import {connect} from "react-redux";
import { push } from 'react-router-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import Users from './users/Users';
import Classes from './userclasses/Classes';
import Statistics from './statistics/Statistics';

/**
 * Class represents the admin page.
 * Controls a Tabs component, Material-UI.
 * Parent: {@link Root}
 * Children: {@link Users} and {@link Classes}
 */
class Admin extends React.Component {

    render() {
        const { index, path, push } = this.props;
        return (
            <div>
                <Tabs
                    initialSelectedIndex={index}
                    value={path}
                >
                    <Tab value="/admin" label="Admin startside" onActive={push.bind(null, '/admin')}>
                        <div style={{padding: '10px'}}>
                            <h2>Adminpanel</h2>
                            <div>
                                <p>
                                    <b>Admin</b>-panelet er for deg med administrative rettigheter.
                                </p>
                                <p>
                                    I dette panelete kan du gjennomføre handlinger som påvirker andre brukere og brukerklasser. <br/>
                                    Dette inkluderer oppretting av brukere og klasser.
                                </p>
                                <p>
                                    Merk at alle brukere opprettet utenfor dette panelet starter som <b>User</b>,
                                    og de må gis eventuelle ekstra rettigheter i dette panelet.
                                </p>
                                <p>
                                    Du kan også se noe statistikk over kravbruk i den siste fanen.
                                </p>
                                <p>Arbeidsflyt</p>
                                <ul>
                                    <ol>1. Legg til en <b>brukerklasse</b> (valgfritt)</ol>
                                    <ol>2. Legg til en <b>bruker</b>. (kan da bruke enhver brukerklasse)</ol>
                                    <ol>3. Redigere brukere eller brukerklasse på respektive sider.</ol>
                                    <ol>4. Se statistikk over brukte krav.</ol>
                                </ul>
                            </div>
                        </div>
                    </Tab>
                    <Tab value="/admin/users" label="Brukere" onActive={push.bind(null, '/admin/users')}>
                        <div>
                            <Users/>
                        </div>
                    </Tab>
                    <Tab value="/admin/classes" label="Brukerklasser" onActive={push.bind(null, '/admin/classes')}>
                        <div>
                            <Classes/>
                        </div>
                    </Tab>
                    <Tab value="/admin/stats" label="Statistikk" onActive={push.bind(null, '/admin/stats')}>
                        <div id="admin">
                            <Statistics/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        path: props.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (url) => dispatch(push(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);