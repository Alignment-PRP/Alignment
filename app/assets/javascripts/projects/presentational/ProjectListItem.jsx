import React from 'react';
import {Link} from 'react-router';

export default class ProjectList extends React.Component {

    render() {
        const url = "project/" + this.props.index;
        const project = this.props.project;
        return (
                <tr>
                    <td>{project.name}</td>
                    <td>{project.creatorID}</td>
                    <td>{project.managerID}</td>
                    <td><Link to={url}><button>Rediger</button></Link></td>
                </tr>
        );
    }
}