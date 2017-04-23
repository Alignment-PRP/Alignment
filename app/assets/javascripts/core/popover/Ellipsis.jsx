import React from 'react';
import {blueGrey500} from "material-ui/styles/colors";

/**
 * Basic ellipsis.
 * Mostly used for multi-line columns in {@link DataTable}.
 * @see Popover
 */
class Ellipsis extends React.Component {

    render() {
        const { object, property, popoverChangeOpen, popoverChangeAnchor, popoverChangeContent } = this.props;
        return (
            <span>
                ...
                <span style={{color: blueGrey500, cursor: 'pointer'}} onClick={(event) => {
                    popoverChangeOpen(true);
                    popoverChangeAnchor(event.currentTarget);
                    popoverChangeContent(object[property]);
                }
                }>Les Mer</span>
            </span>
        );
    }

}

export default Ellipsis;
