import React from 'react';

export default class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null
        }
    }

    componentDidMount() {

        const id = this.props.params.id;
        this.setState({
            id: id
        })

    }


    render() {


        return (
            <div>
                <h1>Prosjekt {this.state.id}</h1>
            </div>
        );
    }
}