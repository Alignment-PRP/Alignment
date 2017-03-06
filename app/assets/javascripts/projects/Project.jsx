import React from 'react';
import axios from 'axios';

import ProjectRequirements from '../requirements/ProjectRequirements.jsx';


export default class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            url: null,
            project: []
        }
    }

    componentDidMount() {
        const id = this.state.id;
        const url = 'http://localhost:9000/project/id/' + id;

        axios.get(url)
            .then( response => {
                    this.setState({
                        project: response.data
                    })
                }
            );

    }

    project(){
        let id = "";
        let name = "";
        let desc = "";

        this.state.project.map((item)=>{
            id = item.projectid;
            name = item.name;
            desc = item.description;
        });

        return(
            <div className="singleProject">
                <h1>{name}</h1>
                <p>ID: {id}</p>
                <p>Beskrivelse:{desc}</p>
            </div>

        );
    }


    render() {
        return (
            <div className="container">
                {this.project()}
                <div className="projectRequirements">
                <ProjectRequirements id={this.state.id}/>
                </div>
            </div>
        );
    }
}