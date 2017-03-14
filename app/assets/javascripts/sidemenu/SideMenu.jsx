import React from 'react';
import { connect } from 'react-redux';

import { changeSideMenuMode } from '../redux/actions/sideMenuActions.jsx';
import { updateFilter } from '../redux/actions/requirementActions.jsx';
import { updateFilterRequirementList } from '../redux/actions/requirementActions.jsx';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.updateMenuFilter = this.updateMenuFilter.bind(this);
        this.filterRequirementList = this.filterRequirementList.bind(this);
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





    renderMenu() {
        switch(this.props.mode) {
            case "FILTER":
               return (
                <div>
                    <h2>Filter</h2>
                    <p>Sikkerhet<input onChange={this.updateMenuFilter} type="checkbox" name="sikkerhet" value="Sikkerhet"/></p>
                    <p>Pålitelighet<input onChange={this.updateMenuFilter} type="checkbox" name="pålitelighet" value="Pålitelighet"/></p>
                    <button onClick={this.filterRequirementList}>Oppdater</button>
                </div>
               );
                break;
            default:
                return (
                    <div>
                        <h2>Meny</h2>
                        <p>Legg til stuff</p>
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
        filter: state.requirementReducer.filter,
        requirements: state.requirementReducer.requirements,
        filterRequirementList: state.requirementReducer.filterRequirementList
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