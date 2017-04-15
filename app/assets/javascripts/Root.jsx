import React from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import SideMenu from './sidemenu/SideMenu';
import Snack from './core/Snack';

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
