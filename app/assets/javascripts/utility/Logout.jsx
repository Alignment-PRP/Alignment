import React from 'react';

export default class Logout extends React.Component {

    componentDidMount() {
        window.location = "http://localhost:9000/logout";
    }

    render() {
        return (
            <p>Logger ut...</p>
        );
    }
}