import React from 'react';
import axios from 'axios';
import RequirementList from './RequirementList.jsx';

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
            return <RequirementList key={index} Name={item.name} isPublic={item.ispublic} Description={item.description} Source={item.source}  Stimulus={item.stimulus}
                                    Artifact={item.artifact} Environment={item.environment} Response={item.response} ResponseMeasure={item.responsemeasure}
                                    Category={item.cname} CategoryDescription={item.cdesc}/> }
        )
    }


    render() {
        return (
            <div>
                <h1>Alle Krav</h1>
                <ul>
                    {this.generateRequirementList()}
                </ul>
            </div>
        );
    }
}