import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import SubHeader from 'material-ui/Subheader';
import { getAllCategoryNames } from '../../redux/actions/requirementActions';
import { updateFilter, updateFilterRequirementList, addToFilter, removeFromFilter, addToSubFilter, removeFromSubFilter  } from '../../redux/actions/filterActions';
import CategoryCheckBoxes from '../../core/filter/checkboxes/CategoryCheckBoxes';

class Filter extends React.Component {

    componentDidMount(){
        this.props.getAllCategoryNames()
    }

    _updateLists() {
        this.props.updateFilterRequirementList('allRequirements', this.props.requirements);
        this.props.updateFilterRequirementList('projectRequirements', this.props.projectRequirements);
    }

    _updateFilter(event, isChecked) {
        const value = event.target.value;
        if (isChecked) {
            this.props.addToFilter(value);
        } else {
            this.props.removeFromFilter(value);
        }
        this._updateLists();
    }

    _sub(event, isChecked, parent) {
        const value = event.target.value;
        if (isChecked) {
            if (!this.props.filter[parent]) {
                this.props.addToFilter(parent);
            }
            this.props.addToSubFilter(value, parent);
        } else {
            this.props.removeFromSubFilter(value, parent);
        }
        this._updateLists();
    }

    render() {
        const { categories, filter, title } = this.props;
        console.log("#########");
        console.log(filter);
        console.log("#########");
        return (
            <div style={{minWidth: '250px', height: '100%'}}>
                <h2>{title}</h2>
                <List>
                    <SubHeader>Kategori</SubHeader>
                    <CategoryCheckBoxes filter={filter} categories={categories} onCheck={this._updateFilter.bind(this)} onCheckSub={this._sub.bind(this)}/>
                </List>
                <Divider/>
                {/*Temporary placeholder before structure gets in place*/}
                <List>
                    <SubHeader>Struktur</SubHeader>
                    <ListItem primaryText="Source" leftCheckbox={<Checkbox/>}/>
                    <ListItem primaryText="Stimulus" leftCheckbox={<Checkbox/>}/>
                    <ListItem primaryText="Artifact" leftCheckbox={<Checkbox/>}/>
                </List>
                <Divider/>
                <List>
                    <SubHeader>Krav Meny</SubHeader>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Link to="newrequirement">
                            <RaisedButton primary={true} label="Nytt Krav" />
                        </Link>
                    </div>
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        requirements: state.requirementReducer.requirements,
        projectRequirements: state.projectReducer.projectRequirements,
        filter: state.filterReducer.filters['project'],
        categories: state.requirementReducer.categoryNames
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (newFilter) => {
            dispatch(updateFilter(newFilter))
        },
        addToFilter: (category) => {
            dispatch(addToFilter('project', category));
        },
        removeFromFilter: (category) => {
            dispatch(removeFromFilter('project', category));
        },
        addToSubFilter: (sub, parent) => {
            dispatch(addToSubFilter('project', sub, parent));
        },
        removeFromSubFilter: (sub, parent) => {
            dispatch(removeFromSubFilter('project', sub, parent));
        },
        updateFilterRequirementList: (comp, unFiltered) => {
            dispatch(updateFilterRequirementList('project', comp, unFiltered))
        },
        getAllCategoryNames: () => {
            dispatch(getAllCategoryNames())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);