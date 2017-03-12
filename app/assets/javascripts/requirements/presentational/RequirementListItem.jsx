import React from 'react';

export default class RequirementList extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.Name}</h1>
                <p><i>{this.props.Description}</i></p>
                <p>Source: {this.props.Source}</p>
                <p>Stimulus: {this.props.Stimulus}</p>
                <p>Artifact: {this.props.Artifact}</p>
                <p>Response: {this.props.Response}</p>
                <p>ResponseMeasure: {this.props.ResponseMeasure}</p>
                <p>Environment: {this.props.Environment}</p>
                <p>Category: {this.props.Category}</p>
                <p>Category Description: {this.props.CategoryDescription}</p>
            </div>
        );
    }
}