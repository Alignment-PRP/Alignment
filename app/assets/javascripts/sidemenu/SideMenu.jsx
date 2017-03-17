import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Filter from './Filter.jsx';

import { changeSideMenuMode } from '../redux/actions/sideMenuActions.jsx';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        //CSS for hiding sidemenu
        this.state = {
            hide: {
                visibility: 'hidden',
                marginLeft: '60px',
                width: '0px',
                flex: '0',
            }
        };
    }

    renderWithDivIdIfMode(divID){
        let divTag = null;
        if(this.props.mode == "HIDE"){
            divTag =( <div style={this.state.hide} id={divID}>
                    {this.renderMenu()}
                    </div> )
        }else{
            divTag =(<div id={divID}>
                    {this.renderMenu()}
                    </div> )
            }
        return divTag
    }

    renderMenu() {
        switch(this.props.mode) {
            case "FILTER":
               return ( <Filter title="Filter" />);
                break;
            case "REQUIREMENTS_MENU":
                return (
                    <div>
                        <h2>Krav Meny</h2>
                        <Link to="allrequirements"><button>Vis kravliste</button></Link>
                    </div>
                );
                break;
            case "UPDATE_REQUIREMENTS_MENU":
                return (
                    <div>
                        <h2>Krav Meny</h2>
                        <Link to="allrequirements"><button>Vis kravliste</button></Link>
                    </div>
                );
                break;
            case "PROJECTS_MENU":
                return (
                    <div>
                        <h2>Prosjekt Meny</h2>
                        <Link to="newproject"><button>Nytt prosjekt</button></Link>
                    </div>
                );
                break;
            case "NEW_PROJECT_MENU":
                return (
                    <div>
                        <h2>Prosjekt Meny</h2>
                        <Link to="projects"><button>Vis prosjekter</button></Link>
                    </div>
                );
                break;
            case "HIDE":
                return (
                    <div>
                        <h2>hidden</h2>
                    </div>
                );
                break;
            default:
                return (
                    <div>
                        <h2>Hjem</h2>
                    </div>
                );
        }

    }

    render() {
        return (
            this.renderWithDivIdIfMode("sidemenu")
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
        requirements: state.requirementReducer.requirements,
        filter: state.requirementReducer.filter,
        filterRequirementList: state.requirementReducer.filterRequirementList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
        updateFilter: (newFilter) => {
            dispatch(updateFilter(newFilter))
        },
        updateFilterRequirementList: (newRequirementList) => {
            dispatch(updateFilterRequirementList(newRequirementList))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);