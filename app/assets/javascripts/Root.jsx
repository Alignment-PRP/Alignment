import React from 'react';
import Sidebar from './Layout/Sidebar.jsx';
import Header from './Layout/Header.jsx';

export default class Root extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <Sidebar/>
            </div>
        );
    }

}