import React from 'react';

export default class RequirementListItemCheckbox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.Name}</h1>
                <p><i>{this.props.Description}</i></p>

                <ul>
                    <li><p>Source: {this.props.Source}</p></li>
                    <li> <p>Stimulus: {this.props.Stimulus}</p></li>
                    <li> <p>Artifact: {this.props.Artifact}</p></li>
                    <li><p>Response: {this.props.Response}</p></li>
                    <li><p>ResponseMeasure: {this.props.ResponseMeasure}</p></li>
                    <li><p>Environment: {this.props.Environment}</p></li>
                    <li><p>Category: {this.props.Category}</p></li>
                    <li><p>Category Description: {this.props.CategoryDescription}</p></li>
                </ul>

            </div>
        );
    }
}