import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';

//<HelpToolTip toolTip="Tooltip string"/>


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
        iconColor: '#616161',
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
                iconStyle={this.props.Styles || styles.standardIcon}
                disableTouchRipple="true"
                style={styles.small}
                tooltip={this.props.toolTip || "Default tooltip"}
                tooltipPosition={this.props.toolTipPosition || 'bottom-right'}
            > <ActionHelpOutline />
            </IconButton>
                   /* <IconButton
                        iconStyle={styles.standardIcon}
                        style={styles.standard}
                        iconClassName="material-icons"
                        tooltip={this.props.toolTip || "Default tooltip"}
                        tooltipPosition={this.props.toolTipPosition || 'bottom-right'}
                    >
                        <ActionHelpOutline />
                    </IconButton>*/
        );
    }
}


export default HelpToolTip;