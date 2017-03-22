import React from 'react';
import {Link} from 'react-router';

export default class ProjectList extends React.Component {

    render() {
        const url = "project/" + this.props.index;
        const project = this.props.project;
        return (
                <tr>
                    <td>{project.name}</td>
                    <td>{project.owner}</td>
                    <td>{project.securityLevel}</td>
                    <td>{project.transactionVolume}</td>
                    <td>{project.userChannel}</td>
                    <td>{project.deploymentStyle}</td>
                    <td><Link to={url}><button>Rediger</button></Link></td>
                </tr>
        );
    }
}