import React from 'react';
import axios from 'axios';
import RequirementListItemCheckobx from './RequirementListItemCheckbox.jsx';

export default class AllRequirements extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            requirement: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:9000/requirements/all ')
            .then( response => {
                    this.setState({
                        requirement: response.data
                    })
                }
            );
    }

    generateRequirementList(){
        return this.state.requirement.map((item, index) => {
            return <RequirementListItemCheckobx key={index} Name={item.name} isPublic={item.ispublic} Description={item.description} Source={item.source}  Stimulus={item.stimulus}
                                    Artifact={item.artifact} Environment={item.environment} Response={item.response} ResponseMeasure={item.responsemeasure}
                                    Category={item.cname} CategoryDescription={item.cdesc}/> }
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
                        <th>Source</th>
                        <th>Stimulus</th>
                        <th>Artifact</th>
                        <th>Responce</th>
                        <th>ResponceMeasure</th>
                        <th>Environment</th>
                        <th>Category</th>
                        <th>CategoryDescription</th>
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
