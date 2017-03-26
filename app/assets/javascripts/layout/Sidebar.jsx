import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router';

import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.style = {
            sidebar: {
                margin: '0',
                padding: '0',
                height: '100%',
                width: '290px',
                left: '-220px',
                transform: 'translate(0,0)',
                transition: '0.3s',
                backgroundColor: '#191919',
                textColor: '#e8e8e8',
                display: 'block',
                position: 'fixed',
                zIndex: '99999'



            },
            rightIcon: {
                textAlign: 'center',
                lineHeight: '24px',
                fontSize: '24px',
                backgroundColor: '#E8E8E8',
                margin: '6px',
                width: '24px',
                height: '24px',
                padding: '6px',
                right: '11px'
            },
            menuItem: {
                color: '#E8E8E8'
            }
        };

        this.state = {open: false};
    }

    open() {
        let sidebar = JSON.parse(JSON.stringify(this.style.sidebar));
        sidebar.transform = 'translate(220px, 0)';
        sidebar.backgroundColor = '#191919';
        this.style.sidebar = sidebar;
        this.setState({open: true});
    }

    close() {
        let sidebar = JSON.parse(JSON.stringify(this.style.sidebar));
        sidebar.transform = 'translate(0, 0)';
        sidebar.backgroundColor = '#191919';
        this.style.sidebar = sidebar;
        this.setState({open: false});
    }

    //Using <Link to="url"/> to use the defined client-urls in main.jsx
    render() {
        return (
            <div style={this.style.sidebar} id="sidebar" onMouseEnter={this.open} onMouseLeave={this.close}>
                <Menu autoWidth={false} width={290}>
                    <MenuItem primaryText="Hjem" onClick={() => this.props.changeSideMenuMode("MENU")} containerElement={<Link to="/" />} style={this.style.menuItem} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">home</FontIcon>}/>
                    <MenuItem primaryText="Prosjekter"containerElement={<Link to="/projects" />} style={this.style.menuItem} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">assignment</FontIcon>} />
                    <MenuItem primaryText="Krav"containerElement={<Link to="/allrequirements" />} style={this.style.menuItem} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">speaker_notes</FontIcon>}/>
                    <MenuItem primaryText="Logg ut"containerElement={<Link to="/logout" />} style={this.style.menuItem} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">directions_run</FontIcon>}/>
                    <MenuItem primaryText="Admin"containerElement={<Link to="/admin" />} rightIcon={<FontIcon style={this.style.rightIcon} className="material-icons">not_interested</FontIcon>}/>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);