import React from 'react';
import axios from 'axios';
import RequirementList from './RequirementList.jsx';

export default class Requirements extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            project: []
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
            return <ProjectList key={index} Name={index.name} isPublic={item.ispublic} Description={item.description} Source={item.source}  Stimulus={item.stimulus}
                                Artifact={item.artifact} Environment={item.environment} Response={item.response}/> }
        )
    }


    render() {
        return (
            <div>
                <h1>Prosjekter</h1>
                <ul>
                    {this.generateRequirementList()}
                </ul>
            </div>
        );
    }
}