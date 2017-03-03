import React from 'react';
import axios from 'axios';
import ProjectList from './ProjectList.jsx';

export default class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            project: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:9000/projects')
            .then( response => {
                    this.setState({
                        project: response.data
                    })
                }
            );
    }

    generateProjectList(){
        return this.state.project.map((item, index) => {
            return <ProjectList key={index} name={item.p_name} descripton={item.p_desc} owner={item.po_username} manager={item.pm_username} /> }
        )
    }


    render() {
        return (
            <div>
                <h1>Prosjekter</h1>
                <ul>
                    {this.generateProjectList()}
                </ul>
            </div>
        );
    }
}