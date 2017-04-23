import React from 'react';
import MuiPopover from 'material-ui/Popover';

/**
 * Basic popover using Material-ui/Popover.
 * Mostly used for multi-line columns in {@link DataTable}.
 */
class Popover extends React.Component {

    render() {
        const { popover, popoverChangeOpen, style } = this.props;
        if (popover) {
            return (
                <MuiPopover
                    open={popover.open}
                    anchorEl={popover.anchor}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={popoverChangeOpen.bind(null, false)}
                >
                    <div style={style ? style : {width: '500px', padding: '12px'}}>{popover.content}</div>
                </MuiPopover>
            );
        }
        return null;
    }

}

export default Popover;
