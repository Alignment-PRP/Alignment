import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

class GenToolbar extends React.Component {

    render() {
        const { title, renderMenu } = this.props;
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle style={{marginLeft: '20px'}} text={title} />
                </ToolbarGroup>
                {renderMenu()}
            </Toolbar>
        );
    }

}

export default GenToolbar;
