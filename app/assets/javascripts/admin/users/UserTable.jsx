import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

/**
 * Class represents a table with users.
 * Parent: {@link Users}
 */
class UserTable extends React.Component {

    /**
     * Maps a list with users to TableRows.
     * @returns {Array}
     */
    userList() {
        return this.props.users.map((item, index) => {
            return <TableRow key={index}>
                <TableRowColumn>{item.ucName}</TableRowColumn>
                <TableRowColumn>{item.USERNAME}</TableRowColumn>
                <TableRowColumn>{item.firstName}</TableRowColumn>
                <TableRowColumn>{item.lastName}</TableRowColumn>
                <TableRowColumn>{item.email}</TableRowColumn>
            </TableRow>
        })
    }

    /**
     * Called when a row is clicked.
     * @param index
     */
    clicked(index) {
        this.props.userClicked(this.props.users[index]);
    }


    render() {
        return (
            <Table
                onRowSelection={this.clicked.bind(this)}
            >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Klasse</TableHeaderColumn>
                        <TableHeaderColumn>Brukernavn</TableHeaderColumn>
                        <TableHeaderColumn>Fornavn</TableHeaderColumn>
                        <TableHeaderColumn>Etternavn</TableHeaderColumn>
                        <TableHeaderColumn>Epost</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                >
                    {this.userList()}
                </TableBody>
            </Table>
        );
    }
}

export default UserTable;