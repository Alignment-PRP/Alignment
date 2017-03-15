import React from 'react';
import { connect } from 'react-redux';

import { getUserData } from './redux/actions/userActions.jsx';

class Home extends React.Component {

    componentDidMount(){
       this.props.getUserData();
    }

    getUserData(){
        let username = "";
        let userClass = "";

        this.props.userdata.map((user)=>{
            username = user.username;
            userClass = user.userClass;
        });

        return(
            <div>
                <p><b>Username:</b> {username} </p>
                <p><b>UserClass:</b> {userClass} </p>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>Velkommen</h1>
                {this.getUserData()}
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
