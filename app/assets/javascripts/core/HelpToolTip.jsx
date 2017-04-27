import React from 'react';
import {IconButton } from "material-ui";

const styles = {
    smallIcon: {
        color: '#81D4FA',
        width: 3,
        height: 3,
    },
    small: {
        width: 3,
        height: 3,
        padding: 3,
    },
    mediumIcon: {
        width: 48,
        height: 48,
    },
    largeIcon: {
        width: 60,
        height: 60,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    large: {
        width: 120,
        height: 120,
        padding: 30,
    },
    /*
    left: {
        bottom-right: "bottom-right",
        bottom-left: "bottom-left",
        top-right:"top-right",
        top-left:"top-left",
    },
    right:{

    }
    */
};


/**
 * Tooltip.
 * Contains @Tooltip
 */
class HelpToolTip extends React.Component {

    render() {
        return (
            <IconButton
                iconStyle={styles.smallIcon}
                style={styles.small}
                iconClassName="material-icons"
                tooltip={this.props.toolTip}
                tooltipPosition={this.props.toolTipPosition || 'bottom-right'}
            >help_outline</IconButton>
        );
    }
}
/*
const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};
*/
//export default connect(mapStateToProps, mapDispatchToProps)(Snack);
export default HelpToolTip;