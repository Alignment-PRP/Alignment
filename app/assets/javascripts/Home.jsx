import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getUserData } from './redux/actions/userActions.jsx';

class Home extends React.Component {

    componentDidMount(){
       this.props.getUserData();
    }

    UserData(){
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
            <div id="home">
                <h1>Velkommen</h1>
                {this.UserData()}
                <Link to="testing"><button>Testing</button></Link>
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
