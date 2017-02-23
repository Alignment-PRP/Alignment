import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.style = {
            sidebar: {
                margin: '0',
                padding: '0',
                height: '100vh',
                width: '290px',
                left: '-220px',
                transform: 'translate(0,0)',
                transition: '0.3s',
                backgroundColor: 'skyblue',
                display: 'block',
                position: 'fixed',
                zIndex: '500'
            },
            rightIcon: {
                textAlign: 'center',
                lineHeight: '24px',
                fontSize: '24px',
                backgroundColor: 'darkblue',
                margin: '6px',
                width: '24px',
                height: '24px',
                padding: '6px',
                right: '11px'
            },
        };

        this.state = {open: false};
    }

    open() {
        let sidebar = JSON.parse(JSON.stringify(this.style.sidebar));
        sidebar.transform = 'translate(220px, 0)';
        sidebar.backgroundColor = 'pink';
        this.style.sidebar = sidebar;
        this.setState({open: true});
    }

    close() {
        let sidebar = JSON.parse(JSON.stringify(this.style.sidebar));
        sidebar.transform = 'translate(0, 0)';
        sidebar.backgroundColor = 'skyblue';
        this.style.sidebar = sidebar;
        this.setState({open: false});
    }

    render() {
        return (
            <div style={this.style.sidebar} onMouseEnter={this.open} onMouseLeave={this.close}>
                <MuiThemeProvider>
                    <Menu autoWidth={false} width={290}>
                        <MenuItem primaryText="Hjem" rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">home</FontIcon>}/>
                        <MenuItem primaryText="Prosjekt" rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">assignment</FontIcon>} />
                        <MenuItem primaryText="Krav" rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">speaker_notes</FontIcon>}/>
                    </Menu>
                </MuiThemeProvider>
            </div>
        );
    }
}