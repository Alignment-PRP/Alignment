
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

    UserData() {

        if(this.props.userdata){
            const USERNAME = this.props.userdata.USERNAME;
            const ucDesc = this.props.userdata.ucDesc;
            const ucName = this.props.userdata.ucName;

            return(
                <div id="user-info">
                    <p>Logget in som: </p>
                    <p>
                        <b>Username:</b> {USERNAME} | <b>Userclass:</b> {ucName} - {ucDesc}
                    </p>
                </div>
            )
        } else {
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
                    <img id="login-logo" src="assets/images/alignment.png"/>
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
