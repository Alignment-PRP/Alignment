import React from 'react';
import Header from './layout/Header.jsx';
import Sidebar from './layout/Sidebar.jsx';
import SideMenu from './sidemenu/SideMenu.jsx';
import Snack from './core/Snack.jsx';

/**
 * Root container for the application.
 * Contains {@link Sidebar}, {@link Header} and {@link SideMenu}
 */
class Root extends React.Component {

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
                    <Snack/>
                </div>
            </div>
        );
    }

}

export default Root;
