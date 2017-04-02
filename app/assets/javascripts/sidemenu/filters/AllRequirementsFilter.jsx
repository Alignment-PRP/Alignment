import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { updateFilter, updateFilterRequirementList, getAllCategoryNames  } from '../../redux/actions/requirementActions.jsx';

class AllRequirementsFilter extends React.Component {
    constructor(props) {
        super(props);

        this.updateMenuFilter = this.updateMenuFilter.bind(this);
        this.filterRequirementList = this.filterRequirementList.bind(this);
        this.generateFilterMenuCheckboxes = this.generateFilterMenuCheckboxes.bind(this);
    }

    componentDidMount(){
        this.props.getAllCategoryNames()
    }

    filterRequirementList() {
        const allRequirements = this.props.requirements;
        const newFilterRequirementList = [];
        const categoryFilter = this.props.filter;

        for (let requirement of allRequirements){
            for (let category of categoryFilter){
                if (category == requirement.cName){
                   newFilterRequirementList.push(requirement);
                }
            }
        }
        this.props.updateFilterRequirementList(newFilterRequirementList);


    }

    updateMenuFilter(e) {
        // e contains the values of the checkbox item that calls on this method.
        //Check if checkbox is checked or not. Returns True if it is, and False it not.
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        //If true update requirementReducer filter array.
        if (value) {
            const newFilter = this.props.filter;
            newFilter.push(e.target.value);
            this.props.updateFilter(newFilter);

        }else{ //If False, remove unchecked checbox value from requirementReducer filter array.
            const removeCategory = e.target.value;
            const oldFilter = this.props.filter;
            const newFilter = oldFilter.filter(item => item !== removeCategory);
            this.props.updateFilter(newFilter);

        }

    }


    generateFilterMenuCheckboxes(){
        //Get all category objects from Redux Store
        const categories = this.props.categories;

        //Iterarting trough each name and sending it as props to <input/> to build checkboxes
        return categories.map((category, index) => {
            return <li key={index} >{category.name}<input onChange={this.updateMenuFilter} type="checkbox" name={category.name} value={category.name}/></li>
            }
        )
    }

    render() {
        return (
            <div id="filter">
                <h2>{this.props.title}</h2>
                <h2><b>Kategori</b></h2>
                <ul style={{listStyleType: 'none'}}>
                {this.generateFilterMenuCheckboxes()}
                </ul>
                {/*Temporary placeholder before structure gets in place*/}
                <h2><b>Struktur</b></h2>
                <ul style={{listStyleType: 'none'}}>
                    <li>Source<input type="checkbox" name="placeholder"/></li>
                    <li>Stimulus<input type="checkbox" name="placeholder"/></li>
                    <li>Artifact<input type="checkbox" name="placeholder"/></li>
                </ul>
                <RaisedButton primary={true} onClick={this.filterRequirementList} label="Oppdater kravliste"/>
                <br/>
                <br/>
                <h2><b>Krav Meny</b></h2>
                <Link to="newrequirement"><RaisedButton primary={true} label="Nytt krav"/></Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        requirements: state.requirementReducer.requirements,
        filter: state.requirementReducer.filter,
        filterRequirementList: state.requirementReducer.filterRequirementList,
        categories: state.requirementReducer.categoryNames
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (newFilter) => {
            dispatch(updateFilter(newFilter))
        },
        updateFilterRequirementList: (newRequirementList) => {
            dispatch(updateFilterRequirementList(newRequirementList))
        },
        getAllCategoryNames: () => {
            dispatch(getAllCategoryNames())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementsFilter);