import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
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
            handleUser, handleAll, handleArchived, handleNew, className
        } = this.props;
        return (
            <div className={className}>
                <Paper>
                    <List>
                        <ListItem disabled={true} primaryText="PROSJEKT MENY"/>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem primaryText="Mine Prosjekter" onClick={handleUser}/>
                        <ListItem primaryText="Alle Prosjekter" onClick={handleAll}/>
                        <ListItem primaryText="Arkiverte Prosjekter" onClick={handleArchived}/>
                    </List>
                    <Divider/>
                    <List style={{display: 'flex', justifyContent: 'center'}}>
                        <RaisedButton onClick={handleNew} primary={true} label="Nytt Prosjekt" />
                    </List>
                </Paper>
            </div>
        );
    }

}

export default ProjectsSideMenu;
