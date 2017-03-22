import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import * as URLS from './../config.jsx';
import { browserHistory } from 'react-router';

export default class UserTable extends React.Component {

    rowClicked(selected) {

        console.log(this.props.users);
    }

    userList() {
        return this.props.users.map((item, index) => {
            return <TableRow key={index}>
                <TableRowColumn>{item.userid}</TableRowColumn>
                <TableRowColumn>{item.username}</TableRowColumn>
                <TableRowColumn>{item.email}</TableRowColumn>
            </TableRow>
        })
    }


    render() {
        return (
            <Table
                onRowSelection={this.props.userClicked.bind(this)}
            >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>BrukerID</TableHeaderColumn>
                        <TableHeaderColumn>Brukernavn</TableHeaderColumn>
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
