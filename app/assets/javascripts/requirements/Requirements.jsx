import React from 'react';
import {connect} from "react-redux";
import { getAllRequirements, getAllCategoryNames, updateRequirement, deleteRequirement } from "../redux/actions/requirementActions";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions";
import { dialogOpen, dialogChangeAction } from './../redux/actions/dialogActions';
import GenericTable from './../core/table/GenericTable';
import DeleteDialog from './../core/dialog/DeleteDialog';

class Requirements extends React.Component {

    componentDidMount(){
        this.props.getAllRequirements();
        this.props.getAllCategoryNames();
        this.props.changeSideMenuMode("FILTER");
    }


    render() {
        const {
            filterRequirementList, requirements, filter,
            updateRequirement, deleteRequirement,
            deleteDialogIsOpen, deleteDialogAction, deleteDialogOpen, deleteDialogChangeAction,
        } = this.props;

        const metaData = {
            table: 'requirements',
            objects: Object.keys(filter).length > 0 ? filterRequirementList : requirements,
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
            <div>
                <GenericTable metaData={metaData}/>
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
        filterRequirementList: state.requirementReducer.filterRequirementList,
        requirements: state.requirementReducer.requirements,
        filter: state.requirementReducer.filter,
        deleteDialogIsOpen: state.dialogReducer.requirementDelete.isOpen,
        deleteDialogAction: state.dialogReducer.requirementDelete.action
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
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
