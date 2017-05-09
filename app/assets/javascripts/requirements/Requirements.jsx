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
import {
    FontIcon, IconButton, RaisedButton, ToolbarGroup, ToolbarSeparator
} from "material-ui";
import { TableRowColumn, TableHeaderColumn } from 'material-ui/Table';
import { AuthMin } from './../core/auth/Auth';
import { ADMIN_PAGE } from './../core/auth/rights';

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
            updateRequirement, requirementInfoDialog, requirement, requirementInfoDialogIsOpen,
            newDialog,

        } = this.props;

        const config = {
            table: 'requirements',
            data: filter ? filterRequirementList : requirements,
            columns: [
                {label: 'Navn', property: 'name', width: '10%'},
                {label: 'Beskrivelse', property: 'description', width: '40%', wrap: {
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
                }, width: '24px'},
                {type: 'CUSTOM', render: (requirement, row, icp) => {
                    const handleClick = () => {
                        editDialog(true);
                        updateRequiredValues(requirement);
                        const structures = {};
                        requirement.structures.forEach(struc => structures[struc.type] = struc.content);
                        updateOptionalValues(structures);
                    };
                    return (
                        <AuthActionRow handleClick={handleClick}
                                            icon="edit"
                                            tooltip="Rediger"
                                            row={row}
                                            {...icp}

                        />
                    );
                }, renderHeader: (row, index, icp) => {
                    return <AuthHeaderRow row={row}
                                          key={index}
                                          {...icp}
                    />
                }, width: '24px'},
                {type: 'CUSTOM', render: (requirement, row, icp) => {
                    const handleClick = () => {
                        deleteDialogOpen(true);
                        deleteDialogChangeAction(() => {deleteRequirement(requirement); deleteDialogOpen(false)})
                    };
                    return (
                        <AuthActionRow handleClick={handleClick}
                                       icon="delete"
                                       tooltip="Slett"
                                       row={row}
                                       {...icp}
                        />
                    );
                }, renderHeader: (row, index, icp) => {
                    return <AuthHeaderRow row={row}
                                          key={index}
                                          {...icp}
                    />
                }, width: '24px'},
            ],
            toolbar: {
                title: 'Krav',
                search: 'name',
                render: () => {
                    return (
                        <NewRequirement onClick={newDialog.bind(null, true)}/>
                    );
                }
            }
        };

        return (
            <div className="container">
                <div style={{display: 'flex'}}>
                    <Paper style={{padding: '12px'}}>
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

const AuthHeaderRow = AuthMin(ADMIN_PAGE)(({row, user, push, ...icp}) => {
    return null;
    return (
        <TableHeaderColumn {...icp} style={{width: row.width, maxWidth: row.width, padding: '1px 12px 1px 12px'}}>
            <div style={{width: '24px', height: '48px'}}/>
        </TableHeaderColumn>
    );
});

const AuthActionRow = AuthMin(ADMIN_PAGE)(({handleClick, icon, tooltip, row, user, push, ...icp}) => {
    return (
        <TableRowColumn {...icp} style={{...icp.style, width: row.width, maxWidth: row.width, padding: '1px 12px 1px 12px',  overflow: 'visible'}}>
            <IconButton onClick={handleClick}  style={{padding: 0, width: '24px', height: '24px'}} tooltip={tooltip} tooltipPosition="top-left">
                <FontIcon className="material-icons">{icon}</FontIcon>
            </IconButton>
        </TableRowColumn>
    );
});

const NewRequirement = AuthMin(ADMIN_PAGE)(({onClick}) => {
    return (
        <ToolbarGroup>
            <ToolbarSeparator />
            <RaisedButton label="Nytt Krav" primary={true} onClick={onClick} />
        </ToolbarGroup>
    );
});

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