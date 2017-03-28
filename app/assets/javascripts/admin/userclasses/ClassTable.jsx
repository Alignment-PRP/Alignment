import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class ClassTable extends React.Component {

    classList() {
        return this.props.classes.map((item, index) => {
            return <TableRow key={index}>
                <TableRowColumn>{item.NAME}</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>{item.description}</TableRowColumn>
            </TableRow>
        })
    }

    clicked(index) {
        this.props.classClicked(this.props.classes[index]);
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
                        <TableHeaderColumn>Navn</TableHeaderColumn>
                        <TableHeaderColumn>Beskrivelse</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                >
                    {this.classList()}
                </TableBody>
            </Table>
        );
    }
}
