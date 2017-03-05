import React from 'react';

export default class NewProject extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
                <form action="/projects" method="post">
                    <label><b>Project name</b></label>
                    <input type="text" placeholder="" name="name" required/>

                    <label><b>Project description</b></label>
                    <input type="text" placeholder="" name="desc" required/>
                  <label>Public project</label>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>

                    <button type="submit">Submit</button>

                </form>
        );
    }
}
