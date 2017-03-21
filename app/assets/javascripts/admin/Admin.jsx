import React from 'react';
import {connect} from "react-redux";
import { getUsers } from "../redux/actions/userActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import {Tabs, Tab} from 'material-ui/Tabs';
import Users from './Users.jsx';

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.style = {
            tabContent: {
                margin: '20px',
            }
        };
    }

    componentDidMount(){
        this.props.changeSideMenuMode("HIDE");
    }


    render() {
        console.log(this.props.users);
        return (
            <div>
                <Tabs>
                    <Tab label="Some Tab">
                        <div style={this.style.tabContent}>

                            <h2>Controllable Tab B</h2>
                            <p>
                                This is another example of a controllable tab. Remember, if you
                                use controllable Tabs, you need to give all of your tabs values or else
                                you wont be able to select them.
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Users" value="b">
                        <div style={this.style.tabContent}>
                            <Users users={this.props.users}/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);