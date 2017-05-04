import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from './redux/actions/userActions';

class Home extends React.Component {

    componentDidMount(){
        this.props.getUserData();
    }

    UserData(){
        if(this.props.userdata){
            const { USERNAME, ucDesc, ucName } = this.props.userdata;
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
        getUserData: () => dispatch(getUserData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
