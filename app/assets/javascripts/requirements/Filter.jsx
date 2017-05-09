import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SubHeader from 'material-ui/Subheader';
import { getAllCategoryNames } from '../redux/actions/requirementActions';
import { updateFilterRequirementList, addToFilter, removeFromFilter, addToSubFilter, removeFromSubFilter } from '../redux/actions/filterActions';
import { dialogOpen } from './../redux/actions/dialogActions';
import { getStructures } from "../redux/actions/structureActions";
import CategoryCheckBoxes from './../core/filter/checkboxes/CategoryCheckBoxes';
import StructureCheckBoxes from './../core/filter/checkboxes/StructureCheckBoxes';

class Filter extends React.Component {

    /**
     * Called when the componenet did mount.
     * Fetches all category names and structures.
     */
    componentDidMount(){
        this.props.getAllCategoryNames();
        this.props.getStructures();
    }

    /**
     * Updates the filter and filters requirements.
     * @param {String} filter
     * @param {Object} event
     * @param {Boolean} isChecked
     */
    updateFilter(filter, event, isChecked) {
        const value = event.target.value;
        if (isChecked) {
            this.props.addToFilter(filter, value);
        } else {
            this.props.removeFromFilter(filter, value);
        }
        this.props.updateFilterRequirementList(this.props.requirements);
    }

    /**
     * Updates the sub-filter and filters requirements.
     * @param {String} filter
     * @param {Object} event
     * @param {Boolean} isChecked
     * @param {String} parent
     */
    updateSubFilter(filter, event, isChecked, parent) {
        const value = event.target.value;
        if (isChecked) {
            this.props.addToSubFilter(filter, value, parent);
        } else {
            this.props.removeFromSubFilter(filter, value, parent);
        }
        this.props.updateFilterRequirementList(this.props.requirements);
    }

    /**
     * Renders the {@link StructureCheckboxes}
     * @param {Array.<Structure>} structures
     * @param {String} filter
     * @returns {XML}
     */
    renderStructureCheckboxes(structures, filter){
        if (structures){
            return <StructureCheckBoxes filter={filter}
                                        structures={structures}
                                        onCheck={this.updateFilter.bind(this, 'structure')}
                                        onCheckSub={this.updateSubFilter.bind(this, 'structure')}
            />
        }
    }

    render() {
        const { structures, categories, filter, title } = this.props;
        return (
            <div style={{minWidth: '250px', height: '100%'}}>
                <h2>{title}</h2>
                <List>
                    <SubHeader>Kategori</SubHeader>
                    <CategoryCheckBoxes filter={filter}
                                        categories={categories}
                                        onCheck={this.updateFilter.bind(this, 'category')}
                                        onCheckSub={this.updateSubFilter.bind(this, 'category')}
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
        filter: state.filterReducer.filters['requirements'],
        categories: state.requirementReducer.categoryNames,
        structures: state.structureReducer.structures
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToFilter: (filter, value) => dispatch(addToFilter('requirements', filter, value)),
        removeFromFilter: (filter, value) => dispatch(removeFromFilter('requirements', filter, value)),
        addToSubFilter: (filter, sub, parent) => dispatch(addToSubFilter('requirements', filter, sub, parent)),
        removeFromSubFilter: (filter, sub, parent) => dispatch(removeFromSubFilter('requirements', filter, sub, parent)),
        updateFilterRequirementList: (unFiltered) => dispatch(updateFilterRequirementList('requirements', 'requirements', unFiltered)),
        getAllCategoryNames: () => dispatch(getAllCategoryNames()),
        getStructures: () => dispatch(getStructures()),
        newDialog: (open) => dispatch(dialogOpen('requirementNew', open))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);