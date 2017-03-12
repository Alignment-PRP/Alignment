import React from 'react';
import {Link} from 'react-router';

export default class ProjectList extends React.Component {

    render() {
        const url = "project/" + this.props.index;
        return (
                <tr>
                    <td>{this.props.name}</td>
                    <td>{this.props.descripton}</td>
                    <td>{this.props.owner}</td>
                    <td>{this.props.manager}</td>
                    <td>{this.props.index}</td>
                    <td><Link to={url}><button>Edit</button></Link></td>
                </tr>
        );
    }
}