import React from 'react';
import {connect} from "react-redux";
import { updateRequirement, deleteRequirement } from "../redux/actions/requirementActions";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions";
import { dialogOpen, dialogChangeAction } from './../redux/actions/dialogActions';
import { getAllRequirements, getAllCategoryNames, addFilterComponent } from './../redux/actions/filterActions';
import Paper from 'material-ui/Paper';
import GenericTable from './../core/table/GenericTable';
import DeleteDialog from './../core/dialog/DeleteDialog';
import Filter from './Filter';

class Requirements extends React.Component {

    componentWillMount() {
        this.props.addFilterComponent('requirements');
    }

    componentDidMount(){
        this.props.getAllRequirements();
        this.props.getAllCategoryNames();
        this.props.changeSideMenuMode("HIDE");
    }


    render() {
        const {
            filterRequirementList, requirements, filter,
            updateRequirement, deleteRequirement,
            deleteDialogIsOpen, deleteDialogAction, deleteDialogOpen, deleteDialogChangeAction,
        } = this.props;

        const metaData = {
            table: 'requirements',
            objects: (filter ? Object.keys(filter).length > 0 : false) ? (filterRequirementList ? filterRequirementList : [] ) : requirements,
            rowMeta: [
                {label: 'Navn', field: 'name', width: '20%'},
                {label: 'Beskrivelse', wrap: true, field: 'description', width: '20%'},
                {label: 'Kommentar', wrap: true, field: 'comment', width: '20%'},
                {label: 'Kategori', field: 'cName', width: '12%'},
                {label: 'UnderKategori', field: 'scName', width: '12%'},
                {type: 'EDIT_LINK_ACTION', link: "editrequirement", action: updateRequirement, width: '8%'},
                {type: 'DELETE_ACTION', action: (requirement) => {
                            deleteDialogOpen(true);
                            deleteDialogChangeAction(() => {deleteRequirement(requirement); deleteDialogOpen(false)})
                        }, param: 'RID', width: '8%'}
            ]
        };

        return (
            <div className="containerUsers">
                <div style={{display: 'flex'}}>
                    <Paper>
                        <Filter/>
                    </Paper>
                </div>
                <div className="usertable">
                    <GenericTable metaData={metaData}/>
                </div>

                <DeleteDialog
                    title="Slett Krav"
                    desc="Er du sikker på at du vil slette kravet?"
                    open={deleteDialogIsOpen}
                    action={deleteDialogAction}
                    onRequestClose={deleteDialogOpen.bind(null, false)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterRequirementList: state.filterReducer.filterRequirementList['requirements'],
        requirements: state.filterReducer.requirements,
        filter: state.filterReducer.filter['requirements'],
        deleteDialogIsOpen: state.dialogReducer.requirementDelete.isOpen,
        deleteDialogAction: state.dialogReducer.requirementDelete.action
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFilterComponent: (comp) => {
            dispatch(addFilterComponent(comp));
        },
        deleteDialogOpen: (open) => {
            dispatch(dialogOpen('requirementDelete', open));
        },
        deleteDialogChangeAction: (action) => {
            dispatch(dialogChangeAction('requirementDelete', action));
        },
        getAllRequirements: () => {
            dispatch(getAllRequirements())
        },
        updateRequirement: (requirement) => {
            dispatch(updateRequirement(requirement))
        },
        deleteRequirement: (requirement) => {
            dispatch(deleteRequirement(requirement))
        },
        getAllCategoryNames: () => {
            dispatch(getAllCategoryNames())
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Requirements);
