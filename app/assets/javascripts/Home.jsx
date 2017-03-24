import React from 'react';
import { connect } from 'react-redux';

import { getUserData } from './redux/actions/userActions.jsx';

class Home extends React.Component {

    componentDidMount(){
       this.props.getUserData();
    }

    UserData(){
        let USERNAME = "";
        let ucDesc = "";
        let ucName = "";

        this.props.userdata.map((user)=>{
            USERNAME = user.USERNAME;
            ucDesc = user.ucDesc;
            ucName = user.ucName;
        });

        return(
            <div>
                <p><b>Username:</b> {USERNAME} </p>
                <p><b>Userclass:</b> {ucName} - {ucDesc} </p>
            </div>
        )
    }

    render() {
        return (
            <div id="home">
                <h1>Velkommen</h1>
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
        getUserData: () => {
            dispatch(getUserData())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
