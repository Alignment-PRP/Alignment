import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class GenToolbar extends React.Component {

    render() {
        const { title, render } = this.props;
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle style={{marginLeft: '20px'}} text={title} />
                </ToolbarGroup>
                {render()}
            </Toolbar>
        );
    }

}

export default GenToolbar;