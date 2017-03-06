import React from 'react';
import axios from 'axios';

import Requirements from '../requirements/reqirements.jsx';


export default class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            url: null,
            project: []
        }
    }

    componentDidMount() {
        const id = this.props.params.id;
        const url = 'http://localhost:9000/project/' + id;

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
            <div>
                <h1>{name}</h1>
                <p>ID: {id}</p>
                <p>Beskrivelse:{desc}</p>
            </div>

        );
    }



    render() {
        return (
            <div>
                {this.project()}
                <Requirements/>
            </div>
        );
    }
}