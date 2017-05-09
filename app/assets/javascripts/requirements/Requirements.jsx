import React from 'react';
import {connect} from 'react-redux';
import { updateRequirement, deleteRequirement, getAllCategoryNames, addRequirement, postUpdateRequirement } from '../redux/actions/requirementActions';
import { updateRequiredValues, updateOptionalValues, clearValues, changeStepperIndex } from '../redux/actions/requirementFormActions';
import { getStructures, getStructureTypes } from './../redux/actions/structureActions';
import { dialogOpen, dialogChangeAction } from './../redux/actions/dialogActions';
import { getAllRequirements } from './../redux/actions/requirementActions';
import { popoverAdd } from './../redux/actions/popoverActions';
import { getUsersWithClass } from './../redux/actions/userActions';
import RequirementDialog from './dialog/RequirementDialog';
import Paper from 'material-ui/Paper';
import DataTable from '../core/table/DataTable';
import DeleteDialog from './../core/dialog/DeleteDialog';
import Filter from './Filter';
import Ellipsis from './../core/popover/Ellipsis';
import Popover from './../core/popover/Popover';
import RequirementInfoDialog from "./dialog/RequirementInfoDialog";

class Requirements extends React.Component {

    componentWillMount() {
        this.props.popoverAdd('requirements');


        this.props.getAllRequirements();
        this.props.getAllCategoryNames();
        this.props.getUsersWithClass();
        this.props.getStructureTypes();
        this.props.getStructures();
    }

    render() {
        const {
            filterRequirementList, requirements, filter, clearValues, changeStepperIndex,
            updateRequiredValues, updateOptionalValues, deleteRequirement,
            deleteDialogIsOpen, deleteDialogAction, deleteDialogOpen, deleteDialogChangeAction,
            structures, structureTypes, categories, users, newRequirementDialogIsOpen,
            editRequirementDialogIsOpen, editDialog, postUpdateRequirement, addRequirement,
            updateRequirement, requirementInfoDialog, requirement, requirementInfoDialogIsOpen
        } = this.props;

        const config = {
            table: 'requirements',
            data: filter ? filterRequirementList : requirements,
            columns: [
                {label: 'Navn', property: 'name', width: '10%'},
                {label: 'Beskrivelse', property: 'description', width: '50%', wrap: {
                        lines: 5,
                        ellipsis: (requirement) => {
                            const props = {
                                component: 'requirements',
                                object: requirement,
                                property: 'description'
                            };
                            return <Ellipsis {...props}/>;
                        }
                    }
                },
                {label: 'Kategori', property: 'cName', width: '12%'},
                {label: 'UnderKategori', property: 'scName', width: '12%'},
                {type: 'INFO', action: (requirement) => {
                    updateRequirement(requirement);
                    requirementInfoDialog(true);
                },width: '24px'},
                {type: 'EDIT_ACTION', action: (requirement) => {
                    editDialog(true);
                    updateRequiredValues(requirement);
                    const structures = {};
                    requirement.structures.forEach(struc => structures[struc.type] = struc.content);
                    updateOptionalValues(structures);
                },width: '24px'},
                {type: 'DELETE_ACTION', action: (requirement) => {
                    deleteDialogOpen(true);
                    deleteDialogChangeAction(() => {deleteRequirement(requirement); deleteDialogOpen(false)})
                }, width: '24px'}
            ],
            toolbar: {
                title: 'Krav',
                search: 'name',
                render: () => {}
            }
        };

        return (
            <div className="container">
                <div style={{display: 'flex'}}>
                    <Paper>
                        <Filter/>
                    </Paper>
                </div>
                <div className="table">
                    <DataTable config={config}/>
                </div>

                <Popover component="requirements"/>

                <RequirementDialog
                    title="Nytt Krav"
                    open={newRequirementDialogIsOpen}
                    onRequestClose={() => {
                        changeStepperIndex(0);
                        clearValues();
                        this.props.newDialog(false)
                    }}
                    sendAction={addRequirement}
                    users={users}
                    categories={categories}
                    structures={structures}
                    structureTypes={structureTypes}
                />

                <RequirementDialog
                    title="Endre Krav"
                    open={editRequirementDialogIsOpen}
                    onRequestClose={() => {
                        changeStepperIndex(0);
                        clearValues();
                        this.props.editDialog(false)
                    }}
                    sendAction={postUpdateRequirement}
                    users={users}
                    categories={categories}
                    structures={structures}
                    structureTypes={structureTypes}
                />

                <RequirementInfoDialog
                    title="Krav"
                    open={requirementInfoDialogIsOpen}
                    onRequestClose={requirementInfoDialog.bind(null, false)}
                    requirement={requirement}
                />

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
        requirements: state.requirementReducer.requirements,
        filter: state.filterReducer.filters['requirements'],
        newRequirementDialogIsOpen: state.dialogReducer.requirementNew.isOpen,
        editRequirementDialogIsOpen: state.dialogReducer.requirementEdit.isOpen,
        deleteDialogIsOpen: state.dialogReducer.requirementDelete.isOpen,
        deleteDialogAction: state.dialogReducer.requirementDelete.action,
        popover: state.popoverReducer.popovers['requirements'],
        users: state.userReducer.users,
        categories: state.requirementReducer.categoryNames,
        structures: state.structureReducer.structures,
        structureTypes: state.structureReducer.types,
        requirement: state.requirementReducer.requirement,
        requirementInfoDialogIsOpen: state.dialogReducer.requirementInfoDialog.isOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearValues: () => dispatch(clearValues()),
        changeStepperIndex: (index) => dispatch(changeStepperIndex(index)),
        newDialog: (open) => dispatch(dialogOpen('requirementNew', open)),
        editDialog: (open) => dispatch(dialogOpen('requirementEdit', open)),
        deleteDialogOpen: (open) => dispatch(dialogOpen('requirementDelete', open)),
        deleteDialogChangeAction: (action) => dispatch(dialogChangeAction('requirementDelete', action)),
        getAllRequirements: () => dispatch(getAllRequirements()),
        updateRequiredValues: (requirement) => dispatch(updateRequiredValues(requirement)),
        updateOptionalValues: (structure) => dispatch(updateOptionalValues(structure)),
        updateRequirement: (requirement) => dispatch(updateRequirement(requirement)),
        deleteRequirement: (requirement) => dispatch(deleteRequirement(requirement)),
        getAllCategoryNames: () => dispatch(getAllCategoryNames()),
        popoverAdd: (popover) => dispatch(popoverAdd(popover)),
        getUsersWithClass: () => dispatch(getUsersWithClass()),
        getStructures: () => dispatch(getStructures()),
        getStructureTypes: () => dispatch(getStructureTypes()),
        postUpdateRequirement: (requirement) => dispatch(postUpdateRequirement(requirement)),
        addRequirement: (requirement) => dispatch(addRequirement(requirement)),
        requirementInfoDialog: (open) => dispatch(dialogOpen('requirementInfoDialog', open))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Requirements);