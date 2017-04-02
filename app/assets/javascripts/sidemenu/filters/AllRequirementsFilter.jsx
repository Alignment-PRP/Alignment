import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import { updateFilter, updateFilterRequirementList, getAllCategoryNames  } from '../../redux/actions/requirementActions.jsx';

class AllRequirementsFilter extends React.Component {
    constructor(props) {
        super(props);

        this.updateMenuFilter = this.updateMenuFilter.bind(this);
        this.filterRequirementList = this.filterRequirementList.bind(this);
        this.generateFilterMenuCheckboxes = this.generateFilterMenuCheckboxes.bind(this);

        this.styles = {
                root: {
                    display: 'block',
                    flexWrap: 'wrap'
                },
        };
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
            return <ListItem key={index}>{category.name}<input type="checkbox" name={category.name} value={category.name}/></ListItem>
            }
        )
    }

    render() {
        return (
            <div id="filter" style={this.styles.root}>
                <List>
                    <h2>{this.props.title}</h2>
                    <p>Kategori</p>
                    {this.generateFilterMenuCheckboxes()}
                </List>
                <Divider/>
                {/*Temporary placeholder before structure gets in place*/}
                <List>
                    <p>Struktur</p>
                    <ListItem> Source <input type="checkbox" name="Source" value="Source"/></ListItem>
                    <ListItem> Stimulus <input type="checkbox" name="Stimulus" value="Stimulus"/></ListItem>
                    <ListItem> Artifact <input type="checkbox" name="Artifact" value="Artifact"/></ListItem>
                    <ListItem><RaisedButton primary={true} onClick={this.filterRequirementList} label="Oppdater kravliste"/></ListItem>
                </List>
                <Divider/>
                <List>
                    <p>Krav Meny</p>
                    <ListItem><Link to="newrequirement"><RaisedButton primary={true} label="Nytt krav"/></Link></ListItem>
                </List>
            </div>
        )
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