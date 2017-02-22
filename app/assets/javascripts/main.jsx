import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Navbar from './sidebar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <AppBar/>
                </MuiThemeProvider>
                <Navbar/>
            </div>
        );
    }
}

ReactDOM.render(
    React.createElement(App, null),
    document.getElementById("app")
);