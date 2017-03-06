import React from 'react';
import {Link} from 'react-router';

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const url = "project/" + this.props.index;

        return (
            <div className="projectListItem">
                <h1>{this.props.name}</h1>
                <p>{this.props.descripton}</p>
                <p>Prosjekt Eier: {this.props.owner}</p>
                <p>Prosjekt Sjef: {this.props.manager}</p>
                <p>Index: {this.props.index}</p>
                <Link to={url}>{this.props.name}</Link>
            </div>
        );
    }
}