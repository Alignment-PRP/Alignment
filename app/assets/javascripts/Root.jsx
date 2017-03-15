import React from 'react';
import Header from './layout/Header.jsx';
import Sidebar from './layout/Sidebar.jsx';
import SideMenu from './sidemenu/SideMenu.jsx';

export default class Root extends React.Component {

    render() {
        return (
            <div>
                <Sidebar/>
                <Header/>
                <div className="container">
                    <SideMenu/>
                    <div id="pagecontainer">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}