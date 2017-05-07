import React from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SubHeader from 'material-ui/Subheader';
import { getAllCategoryNames } from '../../redux/actions/requirementActions';
import { getStructures } from "../../redux/actions/structureActions";
import { updateFilterRequirementList, addToFilter, removeFromFilter, addToSubFilter, removeFromSubFilter } from '../../redux/actions/filterActions';
import CategoryCheckBoxes from '../../core/filter/checkboxes/CategoryCheckBoxes';
import StructureCheckBoxes from "../../core/filter/checkboxes/StructureCheckBoxes";

class Filter extends React.Component {

    componentDidMount(){
        this.props.getAllCategoryNames();
        this.props.getStructures();
    }

    _updateLists() {
        this.props.updateFilterRequirementList('allRequirements', this.props.requirements);
        this.props.updateFilterRequirementList('projectRequirements', this.props.projectRequirements);
    }

    _updateFilter(filter, event, isChecked) {
        const value = event.target.value;
        if (isChecked) {
            this.props.addToFilter(filter, value);
        } else {
            this.props.removeFromFilter(filter, value);
        }
        this._updateLists();
    }

    _sub(filter, event, isChecked, parent) {
        const value = event.target.value;
        if (isChecked) {
            this.props.addToSubFilter(filter, value, parent);
        } else {
            this.props.removeFromSubFilter(filter, value, parent);
        }
        this._updateLists();
    }

    renderStructureCheckboxes(structures, filter){
        if (structures){
            return <StructureCheckBoxes filter={filter}
                                        structures={structures}
                                        onCheck={this._updateFilter.bind(this, 'structure')}
                                        onCheckSub={this._sub.bind(this, 'structure')}
            />
        }
    }

    render() {
        const { categories, structures, filter, title } = this.props;
        return (
            <div style={{minWidth: '250px', height: '100%'}}>
                <h2>{title}</h2>
                <List>
                    <SubHeader>Kategori</SubHeader>
                    <CategoryCheckBoxes filter={filter}
                                        categories={categories}
                                        onCheck={this._updateFilter.bind(this, 'category')}
                                        onCheckSub={this._sub.bind(this, 'category')}
                    />
                </List>
                <Divider/>
                <List>
                    <SubHeader>Struktur</SubHeader>
                    {this.renderStructureCheckboxes(structures, filter)}
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
        categories: state.requirementReducer.categoryNames,
        structures: state.structureReducer.structures
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToFilter: (filter, value) => dispatch(addToFilter('project', filter, value)),
        removeFromFilter: (filter, value) => dispatch(removeFromFilter('project', filter, value)),
        addToSubFilter: (filter, child, parent) => dispatch(addToSubFilter('project', filter, child, parent)),
        removeFromSubFilter: (filter, child, parent) => dispatch(removeFromSubFilter('project', filter, child, parent)),
        updateFilterRequirementList: (output, unFiltered) => dispatch(updateFilterRequirementList('project', output, unFiltered)),
        getAllCategoryNames: () => dispatch(getAllCategoryNames()),
        getStructures: () => dispatch(getStructures())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);