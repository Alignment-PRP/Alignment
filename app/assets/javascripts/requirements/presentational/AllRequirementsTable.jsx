import React from 'react';
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
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Beskrivelse</th>
                        <th>Kommentar</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.generateRequirementList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AllRequirements;
