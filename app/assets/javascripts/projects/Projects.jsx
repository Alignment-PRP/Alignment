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
        return this.state.project.map((item) => {
            return <ProjectList index={item.pid} name={item.p_name} descripton={item.p_desc} owner={item.po_username} manager={item.pm_username} /> }
        )
    }


    render() {
        return (
            <div className="all-project-list">
                <h1>Prosjekter</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Beskrivelse</th>
                            <th>Project owner</th>
                            <th>Project manager</th>
                            <th>Stuff</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateProjectList()}
                    </tbody>
                </table>
            </div>
        );
    }
}