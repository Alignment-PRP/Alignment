import React from 'react';
import { connect } from 'react-redux';
import { popoverOpen } from './../../redux/actions/popoverActions';
import MuiPopover from 'material-ui/Popover';

/**
 * Basic popover using Material-ui/Popover.
 * Mostly used for multi-line columns in {@link DataTable}.
 */
class Popover extends React.Component {

    render() {
        const { component, popovers, popoverOpen, style } = this.props;
        const popover = popovers[component];
        if (popover) {
            return (
                <MuiPopover
                    open={popover.open}
                    anchorEl={popover.anchor}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={popoverOpen.bind(null, component, false)}
                >
                    <div style={style ? style : {width: '500px', padding: '24px'}}>{popover.content}</div>
                </MuiPopover>
            );
        }
        return null;
    }

}

const mapStateToProps = (state) => {
    return {
        popovers: state.popoverReducer.popovers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        popoverOpen: (component, open) => {
            dispatch(popoverOpen(component, open));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Popover);
