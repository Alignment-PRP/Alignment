import React from 'react';
import RequirementListItemMini from './presentational/RequirementListItemMini.jsx';

export default class AllRequirementsAdd extends React.Component {


    generateRequirementList(){
        let renderRequirement = this.props.requirements;
        return renderRequirement.map((item, index) => {
            return <RequirementListItemMini key={index} requirement={item}/>
            }
        )
    }


    render() {
        return (
            <div className="all-requirements-list">
                <h1>Alle Krav</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Beskrivelse</th>
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
