import React from 'react';
import RequirementListItemMini from './presentational/RequirementListItemMini.jsx';

export default class ProjectRequirements extends React.Component {

    generateRequirementList(){

        return this.props.requirements.map((item, index) => {
                return <RequirementListItemMini key={index} requirement={item}/>
            }
        )
    }

    render() {
        return (
            <div>
                <h2>Prosjekt Krav</h2>
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
