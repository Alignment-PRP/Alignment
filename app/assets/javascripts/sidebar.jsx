import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};

        this.style = {
            display: 'inline-block',
            margin: '16px 32px 16px 0'
        };
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Paper style={this.style}>
                        <Menu>
                            <MenuItem primaryText="Prosjekter"/>
                            <MenuItem primaryText="Krav"/>
                            <MenuItem primaryText="Noe Annet"/>
                        </Menu>
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}