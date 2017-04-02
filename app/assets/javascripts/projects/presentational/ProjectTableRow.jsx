import React from 'react';
import {Link} from 'react-router';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {PROJECT_GET_BY_ID} from './../../config.jsx';

/**
 * Represents a TableRow with project data.
 * @see ProjectTable
 * @see Project
 */
class ProjectTableRow extends React.Component {

    render() {
        const { project, index, ...meta } = this.props;
        return (
            <TableRow key={index} {...meta}>
                <TableRowColumn>{project.name}</TableRowColumn>
                <TableRowColumn>{project.creatorID}</TableRowColumn>
                <TableRowColumn>{project.managerID}</TableRowColumn>
                <TableRowColumn><Link to={PROJECT_GET_BY_ID + project.ID}><RaisedButton label="Endre"/></Link></TableRowColumn>
            </TableRow>
        );
    }

}

export default ProjectTableRow;
