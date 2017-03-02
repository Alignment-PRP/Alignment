import React from 'react';
import Header from './Layout/Header.jsx';
import Sidebar from './Layout/Sidebar.jsx';
import Footer from './Layout/Footer.jsx';

export default class Root extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <Sidebar/>
                    <div>
                        {this.props.children}
                    </div>
                <Footer/>
            </div>
        );
    }

}