import React from 'react';
import { Link } from 'react-router';

export default class RequirementListItemCheckbox extends React.Component {

    render() {
        return (
        //const url = "project/" + this.props.index;
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
                <td><input type="checkbox" name="" value=""/></td>
                <td><Link to="editrequirement"><button>Rediger</button></Link></td>
            </tr>

        );
    }
}