import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ProjectTableRow from './ProjectTableRow.jsx';

/**
 * Class represents a table with projects.
 * @see Projects
 * @see ProjectTableRow
 * @see Project
 */
class ProjectTable extends React.Component {

    /**
     * Render method.
     * @returns {XML}
     */
    render() {
        const { projects } = this.props;
        return (
            <Table>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Navn</TableHeaderColumn>
                        <TableHeaderColumn>Eier</TableHeaderColumn>
                        <TableHeaderColumn>Leder</TableHeaderColumn>
                        <TableHeaderColumn/>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                >
                    {projects.map((project, index) => {return <ProjectTableRow project={project} key={index}/>} )}
                </TableBody>
            </Table>
        );
    }

}

export default ProjectTable;
