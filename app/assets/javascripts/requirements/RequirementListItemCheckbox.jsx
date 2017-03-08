import React from 'react';

export default class RequirementListItemCheckbox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.Name}</td>
                <td>{this.props.Description}</td>
                <td>{this.props.Source}</td>
                <td>{this.props.Stimulus}</td>
                <td>{this.props.Artifact}</td>
                <td>{this.props.Response}</td>
                <td>{this.props.ResonseMeasure}</td>
                <td>{this.props.Environment}</td>
                <td>{this.props.Category}</td>
                <td>{this.props.CategoryDescription}</td>
                <td><button>Rediger</button></td>
            </tr>

        );
    }
}