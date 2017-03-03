import React from 'react';

export default class Projects extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <p>{this.props.descripton}</p>
                <p>Prosjekt Eier: {this.props.owner}</p>
                <p>Prosjekt Sjef: {this.props.manager}</p>
            </div>
        );
    }
}