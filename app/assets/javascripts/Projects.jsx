import React from 'react';
import axios from 'axios';

export default class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            project: [{}]
        };
    }

    componentDidMount() {
        axios.get('http://localhost:9000/projects')
            .then( response => {
                console.log(response);
                    this.setState({
                        project: response.data
                    })

                }
            );

    };

    render() {

        console.log(this.state.project);

        return (
            <div>
                <h1>{this.state.project[0].p_name}</h1>
            </div>
        );
    }
}