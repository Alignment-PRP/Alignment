import React from 'react';
import {connect} from "react-redux";
import { getAllProjects } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Admin extends React.Component {

    componentDidMount(){
        this.props.getAllProjects();
        this.props.changeSideMenuMode("HIDE");

    }


    render() {
        return (
            <MuiThemeProvider>
                <Tabs
                >
                    <Tab label="Tab A" value="a">
                        <div>
                            <h2>Controllable Tab A</h2>
                            <p>
                                Tabs are also controllable if you want to programmatically pass them their values.
                                This allows for more functionality in Tabs such as not
                                having any Tab selected or assigning them different values.
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Tab B" value="b">
                        <div>
                            <h2>Controllable Tab B</h2>
                            <p>
                                This is another example of a controllable tab. Remember, if you
                                use controllable Tabs, you need to give all of your tabs values or else
                                you wont be able to select them.
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projectReducer.projects
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProjects: () => {
            dispatch(getAllProjects())
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);