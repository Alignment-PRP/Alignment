import React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component {

    render() {
        return (
            <div className="container_404">
                <div className="font_404_big box_404">404</div>
                <div className="font_404_small box_404">This is not the webpage you are looking for</div>
                <hr className="hr_404"/>
                <div className="font_404_small box_404">Let's return to the <Link className="link_404" to="/">home page</Link></div>
            </div>
        );
    }

}
