import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Sidebar from './sidebar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

    render() {

        return (
            <div>
                <Sidebar/>
                <div className="main-content"></div>
            </div>
        );
    }
}

ReactDOM.render(
    React.createElement(App, null),
    document.getElementById("app")
);