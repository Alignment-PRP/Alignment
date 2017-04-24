import React from 'react';
import { connect } from 'react-redux';
import { popoverAnchor, popoverContent, popoverOpen } from './../../redux/actions/popoverActions';
import { cyan500 } from "material-ui/styles/colors";

/**
 * Basic ellipsis.
 * Mostly used for multi-line columns in {@link DataTable}.
 * @see Popover
 */
class Ellipsis extends React.Component {

    render() {
        const { component, object, property, popoverOpen, popoverAnchor, popoverContent } = this.props;
        return (
            <span>
                ...
                <span style={{color: cyan500, fontWeight: 'bold', cursor: 'pointer'}} onClick={(event) => {
                    popoverOpen(component, true);
                    popoverAnchor(component, event.currentTarget);
                    popoverContent(component, object[property]);
                }
                }><br/>Les Mer...</span>
            </span>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        popoverOpen: (component, open) => {
            dispatch(popoverOpen(component, open));
        },
        popoverAnchor: (component, anchor) => {
            dispatch(popoverAnchor(component, anchor));
        },
        popoverContent: (component, content) => {
            dispatch(popoverContent(component, content));
        }
    }
};

export default connect(null, mapDispatchToProps)(Ellipsis);
