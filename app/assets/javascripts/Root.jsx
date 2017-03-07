import React from 'react';
import Header from './layout/Header.jsx';
import Sidebar from './layout/Sidebar.jsx';
import SideMeny from './sidemeny/SideMeny.jsx';

export default class Root extends React.Component {

    render() {
        return (
            <div>
                <Sidebar/>
                <Header/>
                <div className="container">
                    <SideMeny/>
                    <div id="pagecontainer">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

}