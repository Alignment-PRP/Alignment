import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

/**
 * Class represents a table with users.
 * Parent: {@link Classes}
 */
class ClassTable extends React.Component {

    /**
     * Maps a list with classes to TableRows.
     * @returns {Array}
     */
    classList() {
        return this.props.classes.map((item, index) => {
            return <TableRow key={index}>
                <TableRowColumn>{item.NAME}</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>{item.description}</TableRowColumn>
            </TableRow>
        })
    }

    /**
     * Called when a row is clicked.
     * @param index
     */
    clicked(index) {
        this.props.classClicked(this.props.classes[index]);
    }


    render() {
        return (
            <div>
                <h2>Alle brukerklasser</h2>
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
            </div>
        );
    }
}

export default ClassTable;
