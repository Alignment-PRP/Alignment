import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {FontIcon, TextField} from "material-ui";
import { grey500 } from 'material-ui/styles/colors';

class DataTableToolbar extends React.Component {

    constructor(props) {
        super(props);

        this.renderSearchBar = this.renderSearchBar.bind(this);
    }

    renderSearchBar() {
        const { onSearch, title, search } = this.props;
        if (search) {
            return (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FontIcon color={grey500} className="material-icons">search</FontIcon>
                    <TextField id={title} hintText='Søk' onChange={onSearch}/>
                </div>
            );
        }
        return null;
    }

    render() {
        const { title, render } = this.props;
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle style={{marginLeft: '20px'}} text={title} />
                    {this.renderSearchBar()}
                </ToolbarGroup>
                {render()}
            </Toolbar>
        );
    }

}

export default DataTableToolbar;