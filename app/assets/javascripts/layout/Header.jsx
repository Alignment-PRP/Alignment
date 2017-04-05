import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';


import { getUserData } from '../redux/actions/userActions.jsx';

/**
 * Represents a header.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: 0,
        };
    }

    componentDidMount(){
        this.props.getUserData();
        this.timer = setTimeout(() => this.progress(5), 1000);

    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress(completed) {
        if (completed > 100) {
            this.setState({completed: 100});
        } else {
            this.setState({completed});
            const diff = Math.random() * 10;
            this.timer = setTimeout(() => this.progress(completed + diff), 1000);
        }
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
                    <p>Du er logget inn som: </p>
                    <p>
                        <b>Username:</b> {USERNAME} | <b>Userclass:</b> {ucName} - {ucDesc}
                    </p>
                </div>
            )
        }else {
            return (
                <div id="user-info">
                    <p>Laster inn brukerinformasjon</p>
                    <CircularProgress
                        mode="determinate"
                        value={this.state.completed}
                    />
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
