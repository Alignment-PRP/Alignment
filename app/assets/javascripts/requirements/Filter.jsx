import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import SubHeader from 'material-ui/Subheader';
import { getAllCategoryNames } from '../redux/actions/requirementActions';
import { updateFilter, updateFilterRequirementList, addToFilter, removeFromFilter, addToSubFilter, removeFromSubFilter  } from '../redux/actions/filterActions';
import { dialogOpen } from './../redux/actions/dialogActions';
import CategoryCheckBoxes from './../core/filter/checkboxes/CategoryCheckBoxes';

class Filter extends React.Component {

    componentDidMount(){
        this.props.getAllCategoryNames();
    }

    _updateFilter(event, isChecked) {
        const value = event.target.value;
        if (isChecked) {
            this.props.addToFilter(value);
        } else {
            this.props.removeFromFilter(value);
        }
        this.props.updateFilterRequirementList(this.props.requirements);
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
        this.props.updateFilterRequirementList(this.props.requirements);
    }

    renderStructureCheckboxes(structures) {
            return structures ? structures.map((structure, index) => {return <ListItem key={index} primaryText={structure} leftCheckbox={<Checkbox/>}/>}) : null
    }

    render() {
        const { structureTypes, categories, filter, title } = this.props;
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
                    {this.renderStructureCheckboxes(structureTypes)}
                </List>
                <Divider/>
                <List>
                    <SubHeader>Krav Meny</SubHeader>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                            <RaisedButton onClick={this.props.newDialog.bind(null, true)} primary={true} label="Nytt Krav" />
                    </div>
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        requirements: state.requirementReducer.requirements,
        filter: state.filterReducer.filters['requirements'],
        filterRequirementList: state.filterReducer.filterRequirementList['requirements'],
        categories: state.requirementReducer.categoryNames,
        structures: state.structureReducer.structures,
        structureTypes: state.structureReducer.types
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (newFilter) => {
            dispatch(updateFilter(newFilter))
        },
        addToFilter: (category) => {
            dispatch(addToFilter('requirements', category));
        },
        removeFromFilter: (category) => {
            dispatch(removeFromFilter('requirements', category));
        },
        addToSubFilter: (sub, parent) => {
            dispatch(addToSubFilter('requirements', sub, parent));
        },
        removeFromSubFilter: (sub, parent) => {
            dispatch(removeFromSubFilter('requirements', sub, parent));
        },
        updateFilterRequirementList: (unFiltered) => {
            dispatch(updateFilterRequirementList('requirements', 'requirements', unFiltered))
        },
        getAllCategoryNames: () => {
            dispatch(getAllCategoryNames())
        },
        newDialog: (open) => {
            dispatch(dialogOpen('requirementNew', open));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);