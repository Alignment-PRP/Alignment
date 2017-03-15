import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { changeSideMenuMode } from '../redux/actions/sideMenuActions.jsx';
import { updateFilter } from '../redux/actions/requirementActions.jsx';
import { updateFilterRequirementList } from '../redux/actions/requirementActions.jsx';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.updateMenuFilter = this.updateMenuFilter.bind(this);
        this.filterRequirementList = this.filterRequirementList.bind(this);
        this.generateFilterMenuCheckboxes = this.generateFilterMenuCheckboxes.bind(this);
    }

    filterRequirementList() {
        const allRequirements = this.props.requirements;
        const newFilterRequirementList = [];
        const categoryFilter = this.props.filter;

        for (let requirement of allRequirements){
            for (let category of categoryFilter){
                if (category == requirement.cname){
                   newFilterRequirementList.push(requirement);
                }

            }
        }
        this.props.updateFilterRequirementList(newFilterRequirementList);


    }

    updateMenuFilter(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        if (value) {
            const newFilter = this.props.filter;
            newFilter.push(e.target.value);
            this.props.updateFilter(newFilter);
        }else{
            const removeCategory = e.target.value;
            const oldFilter = this.props.filter;
            const newFilter = oldFilter.filter(item => item !== removeCategory);
            this.props.updateFilter(newFilter);

        }

    }

    generateFilterMenuCheckboxes(){
        const allRequirements = this.props.requirements;
        let categoryList = [];

        for (let requirement of allRequirements){
            categoryList.push(requirement.cname);
        }

        const uniqueCategoryList = Array.from(new Set(categoryList));

        return uniqueCategoryList.map((category, index) => {
            return <p key={index} >{category}<input onChange={this.updateMenuFilter} type="checkbox" name={category} value={category}/></p>
            }
        )
    }


    renderMenu() {
        switch(this.props.mode) {
            case "FILTER":
               return (
                <div>
                    <h1>Filter</h1>
                    <h2><b>Kategori</b></h2>
                    {this.generateFilterMenuCheckboxes()}
                    <h2><b>Struktur</b></h2>
                    <p>Source<input type="checkbox" name="placeholder"/></p>
                    <p>Stimulus<input type="checkbox" name="placeholder"/></p>
                    <p>Artifact<input type="checkbox" name="placeholder"/></p>
                    <button onClick={this.filterRequirementList}>Oppdater kravliste</button><br/>
                    <h2><b>Krav Meny</b></h2>
                    <Link to="newrequirement"><button>Legg til nytt krav</button></Link>
                </div>
               );
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
            <div id="sidemenu">
                {this.renderMenu()}
            </div>
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