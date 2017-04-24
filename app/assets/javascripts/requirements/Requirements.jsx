import React from 'react';
import {connect} from "react-redux";
import { updateRequirement, deleteRequirement, getAllCategoryNames, addRequirement } from "../redux/actions/requirementActions";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions";
import { dialogOpen, dialogChangeAction } from './../redux/actions/dialogActions';
import { addFilter, addFiltered } from './../redux/actions/filterActions';
import { getAllRequirements } from './../redux/actions/requirementActions';
import { popoverAdd } from './../redux/actions/popoverActions';
import Paper from 'material-ui/Paper';
import DataTable from '../core/table/DataTable';
import DeleteDialog from './../core/dialog/DeleteDialog';
import Filter from './Filter';
import Ellipsis from './../core/popover/Ellipsis';
import Popover from './../core/popover/Popover';

class Requirements extends React.Component {

    componentWillMount() {
        this.props.addFilter('requirements');
        this.props.addFiltered('requirements');
        this.props.popoverAdd('requirements');
    }

    componentDidMount() {
        this.props.getAllRequirements();
        this.props.getAllCategoryNames();
        this.props.changeSideMenuMode("HIDE");
    }

    render() {
        const {
            filterRequirementList, requirements, filter,
            updateRequirement, deleteRequirement,
            deleteDialogIsOpen, deleteDialogAction, deleteDialogOpen, deleteDialogChangeAction
        } = this.props;

        const config = {
            table: 'requirements',
            data: (filter ? Object.keys(filter).length > 0 : false) ? (filterRequirementList ? filterRequirementList : null ) : requirements,
            columns: [
                {label: 'Navn', property: 'name', width: '10%'},
                {label: 'Beskrivelse', property: 'description', width: '30%', wrap: {
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
                {label: 'Kommentar', property: 'comment', width: '20%', wrap: {
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
                {type: 'EDIT_LINK_ACTION', link: "editrequirement", action: updateRequirement, width: '8%'},
                {type: 'DELETE_ACTION', action: (requirement) => {
                    deleteDialogOpen(true);
                    deleteDialogChangeAction(() => {deleteRequirement(requirement); deleteDialogOpen(false)})
                }, width: '8%'}
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
                    <DataTable config={config}/>
                </div>

                <Popover component="requirements"/>

                <NewRequirementDialog
                    title="Nytt Krav"
                    open={newRequirementDialogIsOpen}
                    handleSubmit={(values) => {addRequirement(values); newDialog(false)}}
                    onRequestClose={newDialog.bind(null, false)}
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
        deleteDialogIsOpen: state.dialogReducer.requirementDelete.isOpen,
        deleteDialogAction: state.dialogReducer.requirementDelete.action,
        popover: state.popoverReducer.popovers['requirements']
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFilter: (filter) => {
            dispatch(addFilter(filter));
        },
        addFiltered: (comp) => {
            dispatch(addFiltered(comp));
        },
        newDialog: (open) => {
            dispatch(dialogOpen('requirementNew', open));
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
        addRequirement: (requirement) => {
            dispatch(addRequirement(requirement))
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
        },
        popoverAdd: (popover) => {
            dispatch(popoverAdd(popover));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Requirements);