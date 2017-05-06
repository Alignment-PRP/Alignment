import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

//<HelpToolTip toolTip="Tooltip string"/>
//<div classname="tool-tip-container">


const styles = {
    smallIcon: {
        color: "#616161",
        width: 16,
        height: 16,
    },
    standardIcon: {
        iconHoverColor: "#BF360C",
        color: '#616161',

        width: 20,
        height: 20,
    },
    small: {
        marginTop: 30,
    },
    tooltip: {
        opacity: 90,
        fontSize: 24,
        color: '#616161',
        backgroundColor: "#616161",
        height: 32,
    },
};


/**
 * Tooltip.
 * Contains @Tooltip
 */
class HelpToolTip extends React.Component {

    render() {
        return (
            <IconButton
                //hoverColor={greenA200}
                //color={blue500}
                iconStyle={this.props.IconStyles || styles.standardIcon}
                disableTouchRipple="true"
                style={{...this.props.Style, ...styles.small}}
                tooltip={this.props.toolTip || "Default tooltip"}
                tooltipPosition={this.props.toolTipPosition || 'bottom-left'}
            > <ActionHelpOutline />
            </IconButton>
        );
    }
}


export default HelpToolTip;