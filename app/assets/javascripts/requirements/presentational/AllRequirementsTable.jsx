import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import RequirementListItem from './RequirementListItem.jsx';

class AllRequirements extends React.Component {


    generateRequirementList(){
        let renderRequirement = [];
        if(this.props.filter.length == 0){
            renderRequirement = this.props.allRequirements;
        }else{
            renderRequirement = this.props.filterRequirementList;
        }
        return renderRequirement.map((requirement, index) => {
            return <RequirementListItem key={index}
                                        updateRequirement={this.props.updateRequirement}
                                        deleteRequirement={this.props.deleteRequirement}
                                        requirement={requirement}/>
            }
        )
    }


    render() {
        return (
            <div className="all-requirements-list">
                <h2>Alle Krav</h2>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Navn</TableHeaderColumn>
                            <TableHeaderColumn>Beskrivelse</TableHeaderColumn>
                            <TableHeaderColumn>Kommentar</TableHeaderColumn>
                            <TableHeaderColumn>Kategori</TableHeaderColumn>
                            <TableHeaderColumn>Under Kategori</TableHeaderColumn>
                            <TableHeaderColumn/>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                    >
                    {this.generateRequirementList()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default AllRequirements;
