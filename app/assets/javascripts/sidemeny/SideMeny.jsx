import React from 'react';
import {Link} from 'react-router';

export default class SideMeny extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="sidemeny">
                <h4> SideMeny </h4>
                <ul>
                    <Link to="#"> <p>Kategoriliste</p></Link>
                </ul>
            </div>
        );
    }
}