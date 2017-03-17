import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { updateFilter } from '../../redux/actions/requirementActions.jsx';
import { updateFilterRequirementList } from '../../redux/actions/requirementActions.jsx';

class AllRequirementsFilter extends React.Component {
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

    render() {
        return (
            <div id="filter">
                <h2>{this.props.title}</h2>
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
    }
}

const mapStateToProps = (state) => {
    return {
        requirements: state.requirementReducer.requirements,
        filter: state.requirementReducer.filter,
        filterRequirementList: state.requirementReducer.filterRequirementList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (newFilter) => {
            dispatch(updateFilter(newFilter))
        },
        updateFilterRequirementList: (newRequirementList) => {
            dispatch(updateFilterRequirementList(newRequirementList))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementsFilter);