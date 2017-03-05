import React from 'react';

export default class NewProject extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
                <form action="/projects" method="post">
                    <label><b>name</b></label>
                    <input type="text" placeholder="Enter Username" name="name" required/>

                    <label><b>description</b></label>
                    <input type="text" placeholder="Enter description" name="desc" required/>

                    <label><b>ispublic</b></label>
                    <input type="text" placeholder="0 or 1" name="ispublic" required/>

                    <button type="submit">Submit</button>

                </form>
        );
    }
}