import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

/**
 * SideMenu component for projects page
 * @param {function} handleUser
 * @param {function} handleAll
 * @param {function} handleArchived
 * @param {function} handleNew
 */
class ProjectsSideMenu extends React.Component {

    render() {
        const {
            handleUser, handleAll, handleArchived, handleNew
        } = this.props;
        return (
            <div>
                <Paper>
                    <List>
                        <ListItem primaryText="Mine Prosjekter" onClick={handleUser}/>
                        <ListItem primaryText="Alle Prosjekter" onClick={handleAll}/>
                        <ListItem primaryText="Arkiverte Prosjekter" onClick={handleArchived}/>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem primaryText="Nytt Prosjekt" onClick={handleNew}/>
                    </List>
                </Paper>
            </div>
        );
    }

}

export default ProjectsSideMenu;
