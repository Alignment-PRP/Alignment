import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import { getAllCategoryNames } from './../../../redux/actions/requirementActions';
import { updateFilter, updateFilterRequirementList, addToFilter, removeFromFilter, addToSubFilter, removeFromSubFilter  } from './../../../redux/actions/filterActions';
import CategoryCheckBoxes from './CategoryCheckBoxes';

class Filter extends React.Component {

    componentDidMount(){
        this.props.getAllCategoryNames()
    }

    _updateFilter(event, isChecked) {
        const value = event.target.value;
        if (isChecked) {
            this.props.addToFilter(value);
        } else {
            this.props.removeFromFilter(value);
        }
        this.props.updateFilterRequirementList();
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
        this.props.updateFilterRequirementList();
    }

    render() {
        const { categories, filter, title } = this.props;
        return (
            <div style={{minWidth: '250px', height: '100%'}}>
                <List>
                    <h2>{title}</h2>
                    <p>Kategori</p>
                    <CategoryCheckBoxes filter={filter} categories={categories} onCheck={this._updateFilter.bind(this)} onCheckSub={this._sub.bind(this)}/>
                </List>
                <Divider/>
                {/*Temporary placeholder before structure gets in place*/}
                <List>
                    <p>Struktur</p>
                    <ListItem primaryText="Source" leftCheckbox={<Checkbox/>}/>
                    <ListItem primaryText="Stimulus" leftCheckbox={<Checkbox/>}/>
                    <ListItem primaryText="Artifact" leftCheckbox={<Checkbox/>}/>
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
        requirements: state.filterReducer.requirements,
        filter: state.filterReducer.filter['pro_requirements'],
        filterRequirementList: state.filterReducer.filterRequirementList['pro_requirements'],
        categories: state.requirementReducer.categoryNames
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (newFilter) => {
            dispatch(updateFilter(newFilter))
        },
        addToFilter: (category) => {
            dispatch(addToFilter('pro_requirements', category));
        },
        removeFromFilter: (category) => {
            dispatch(removeFromFilter('pro_requirements', category));
        },
        addToSubFilter: (sub, parent) => {
            dispatch(addToSubFilter('pro_requirements', sub, parent));
        },
        removeFromSubFilter: (sub, parent) => {
            dispatch(removeFromSubFilter('pro_requirements', sub, parent));
        },
        updateFilterRequirementList: () => {
            dispatch(updateFilterRequirementList('pro_requirements'))
        },
        getAllCategoryNames: () => {
            dispatch(getAllCategoryNames())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);