import React from 'react';
import {connect} from "react-redux";
import { getAllRequirements, getAllCategoryNames, updateRequirement, deleteRequirement } from "../redux/actions/requirementActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { tablePage, tableRows } from './../redux/actions/tableActions.jsx';
import { dialogOpen, dialogChangeAction } from './../redux/actions/dialogActions.jsx';
import GenericTable from './../core/table/GenericTable.jsx';
import RequirementDeleteDialog from './RequirementDeleteDialog.jsx';

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
            page, nRows, changeTablePage, changeTableRows,
            deleteDialogIsOpen, deleteDialogAction, deleteDialogOpen, deleteDialogChangeAction,
        } = this.props;

        const metaData = {
            page: page,
            nRows: nRows,
            objects: filter.length === 0 ? requirements : filterRequirementList,
            rowMeta: [
                {label: 'Navn', field: 'name', width: '20%'},
                {label: 'Beskrivelse', wrap: true, field: 'description', width: '20%'},
                {label: 'Kommentar', wrap: true, field: 'comment', width: '20%'},
                {label: 'Kategori', field: 'cName', width: '12%'},
                {label: 'UnderKategori', field: 'scName', width: '12%'},
                {type: 'EDIT_LINK_ACTION', link: "editrequirement", action: updateRequirement, param: false, width: '8%'},
                {type: 'DELETE_ACTION', action: (RID) => {
                            deleteDialogOpen(true);
                            deleteDialogChangeAction(() => {deleteRequirement(RID); deleteDialogOpen(false)})
                        }, param: 'RID', width: '8%'}
            ]
        };

        return (
            <div>
                <GenericTable metaData={metaData} tablePage={changeTablePage} tableRows={changeTableRows}/>
                <RequirementDeleteDialog
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
        page: state.tableReducer.requirement.page,
        nRows: state.tableReducer.requirement.nRows,
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
        changeTablePage: (page) => {
            dispatch(tablePage('requirement', page))
        },
        changeTableRows: (nRows) => {
            dispatch(tableRows('requirement', nRows));
        },
        getAllRequirements: () => {
            dispatch(getAllRequirements())
        },
        updateRequirement: (requirement) => {
            dispatch(updateRequirement(requirement))
        },
        deleteRequirement: (id) => {
            dispatch(deleteRequirement(id))
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
