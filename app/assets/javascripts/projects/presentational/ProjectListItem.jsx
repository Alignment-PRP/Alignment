import React from 'react';
import {Link} from 'react-router';
import * as URLS from '../../config.jsx'


export default class ProjectList extends React.Component {

    render() {
        const project = this.props.project;
        const url = URLS.PROJECT_GET_BY_ID + project.ID;
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