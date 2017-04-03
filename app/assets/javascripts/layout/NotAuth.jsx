import React from 'react';
import { Link } from 'react-router';

export default class NotAuth extends React.Component {

    render() {
        return (
            <div className="container_403">
                <div className="font_403_big box_403">403</div>
                <div className="font_403_medium box_403">Access Denied/Forbidden</div>
                <div className="font_403_small box_403">You don't have permission to view this page.</div>
                <hr className="hr_403"/>
                <div className="font_403_small box_403">Let's return to the <Link className="link_403" to="/">home page</Link></div>
            </div>
        );
    }

}
