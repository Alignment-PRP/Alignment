import React from 'react';
import axios from 'axios';
import RequirementListItem from './presentational/RequirementListItem.jsx';

export default class ProjectRequirements extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            requirement: []
        };
    }

    componentDidMount() {
        const id = this.props.id;
        const url = 'http://localhost:9000/all-projectrequirements?id=' + id;
        axios.get(url)
            .then( response => {
                    this.setState({
                        requirement: response.data
                    })
                }
            );
    }

    generateRequirementList(){
        return this.state.requirement.map((item, index) => {
            return <RequirementListItem key={index} Name={item.name} isPublic={item.ispublic} Description={item.description} Source={item.source}  Stimulus={item.stimulus}
                                    Artifact={item.artifact} Environment={item.environment} Response={item.response} ResponseMeasure={item.responsemeasure}
                                    Category={item.cname} CategoryDescription={item.cdesc}/> }
        )
    }


    render() {
        return (
            <div>
                <h1>Prosjekt Krav</h1>
                <ul>
                    {this.generateRequirementList()}
                </ul>
            </div>
        );
    }
}