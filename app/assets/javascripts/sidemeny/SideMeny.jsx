import React from 'react';
import {Link} from 'react-router';

export default class SideMeny extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        var currentLocation = this.props.location.pathname;
        console.log(currentLocation);


        return (
            <div id="sidemeny">
                <h4> Meny </h4>
                <ul>
                    <Link to="#"> <p>Kategoriliste</p></Link>
                </ul>
            </div>
        );
    }
}