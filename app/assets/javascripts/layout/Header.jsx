import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';


import { getUserData } from '../redux/actions/userActions';

/**
 * Represents a header.
 */
class Header extends React.Component {

    componentDidMount(){
        this.props.getUserData();

    }

    UserData(){
        let USERNAME = "";
        let ucDesc = "";
        let ucName = "";

        if(this.props.userdata){
            this.props.userdata.map((user)=>{
                USERNAME = user.USERNAME;
                ucDesc = user.ucDesc;
                ucName = user.ucName;
            });

            return(
                <div id="user-info">
                    <p>Logget in som: </p>
                    <p>
                        <b>Username:</b> {USERNAME} | <b>Userclass:</b> {ucName} - {ucDesc}
                    </p>
                </div>
            )
        }else {
            return (
                <div id="user-info">
                    <CircularProgress/>
                </div>
            )
        }
    }

    render() {
        return (
            <div id="header">
                {this.UserData()}
                <header id="title">
                    <h1>Alignment - Trondheim Kommune</h1>
                </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
