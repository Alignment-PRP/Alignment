import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {PROJECT_GET_BY_ID} from './../../config.jsx';

/**
 * Class represents a table with projects.
 * @see Projects
 */
class ProjectTable extends React.Component {

    /**
     * Maps a list with projects to TableRows.
     * @returns {Array}
     */
    projectList() {
        return this.props.projects.map((item, index) => {
            return <TableRow key={index}>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.creatorID}</TableRowColumn>
                <TableRowColumn>{item.managerID}</TableRowColumn>
                <TableRowColumn>
                    <Link to={PROJECT_GET_BY_ID + item.ID}><RaisedButton label="Endre"/></Link>
                    <RaisedButton secondary={true} onClick={() => this.props.deleteProject(item.ID)} label="Slett"/>
                </TableRowColumn>
            </TableRow>
        })
    }

    /**
     * Called when a row is clicked.
     * @param index
     */
    clicked(index) {
        //this.props.projectClicked(this.props.projects[index]);
    }


    render() {
        return (
            <div>
                <h2>Dine Prosjekter</h2>
                <Table
                    onRowSelection={this.clicked.bind(this)}
                >
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
                        {this.projectList()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ProjectTable;