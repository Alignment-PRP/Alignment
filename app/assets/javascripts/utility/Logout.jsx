import React from 'react';

export default class Logout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.location = "http://localhost:9000/logout";
    }

    render() {
        return (
            <p></p>
        );
    }
}