import React from 'react';
import { connect } from 'react-redux';

import { getUserData } from './redux/actions/userActions';
import {changeSideMenuMode} from './redux/actions/sideMenuActions';

class Home extends React.Component {

    componentDidMount(){
        this.props.changeSideMenuMode("MENU");
        this.props.getUserData();
    }

    UserData(){
        let USERNAME = "";
        let ucDesc = "";
        let ucName = "";

        if(this.props.userdata != null){
            this.props.userdata.map((user)=>{
                USERNAME = user.USERNAME;
                ucDesc = user.ucDesc;
                ucName = user.ucName;
            });

            return(
                <div id="user-info">
                    <p><b>Username:</b> {USERNAME} </p>
                    <p><b>Userclass:</b> {ucName} - {ucDesc} </p>
                </div>
            )
        }else {
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
                {this.UserData()}
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
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode));
        },
        getUserData: () => {
            dispatch(getUserData())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
