import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import { updateFilter, updateFilterRequirementList, getAllCategoryNames, addToFilter, removeFromFilter  } from '../../redux/actions/requirementActions.jsx';
import CategoryCheckBoxes from './presentational/CategoryCheckBoxes.jsx';

class AllRequirementsFilter extends React.Component {
    constructor(props) {
        super(props);
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

    _updateFilter(event, isChecked) {
        const value = event.target.value;
        if (isChecked) {
            this.props.addToFilter(value);
        } else {
            this.props.removeFromFilter(value);
        }
        this.props.updateFilterRequirementList();
    }

    render() {
        const { categories } = this.props;
        return (
            <div id="filter" style={this.styles.root}>
                <List>
                    <h2>{this.props.title}</h2>
                    <p>Kategori</p>
                    <CategoryCheckBoxes categories={categories} onCheck={this._updateFilter.bind(this)}/>
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
        addToFilter: (category) => {
            dispatch(addToFilter(category));
        },
        removeFromFilter: (category) => {
            dispatch(removeFromFilter(category));
        },
        updateFilterRequirementList: () => {
            dispatch(updateFilterRequirementList())
        },
        getAllCategoryNames: () => {
            dispatch(getAllCategoryNames())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRequirementsFilter);