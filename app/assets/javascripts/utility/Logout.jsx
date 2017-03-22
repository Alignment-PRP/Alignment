import React from 'react';
import * as URLS from '../config.jsx';

export default class Logout extends React.Component {

    componentDidMount() {
        window.location = URLS.LOGOUT;
    }

    render() {
        return (
            <p>Logger ut...</p>
        );
    }
}