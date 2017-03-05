import React from 'react';

export default class RequirementList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <p>{this.props.descripton}</p>
                <p>Source: {this.props.source}</p>
                <p>Stimulus: {this.props.stimulus}</p>
                <p>Artifact: {this.props.artifact}</p>
                <p>Response: {this.props.response}</p>
                <p>Environment: {this.props.environment}</p>
            </div>
        );
    }
}