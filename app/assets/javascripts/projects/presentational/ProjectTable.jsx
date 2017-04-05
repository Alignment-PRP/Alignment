import React from 'react';
import {connect} from "react-redux";
import { tablePage, tableRows } from './../../redux/actions/tableActions.jsx';
import GenericTable from '../../core/table/GenericTable.jsx';
import {PROJECT_GET_BY_ID} from './../../config.jsx';


/**
 * Class represents a table with projects.
 * @see Projects
 * @see ProjectTableRow
 * @see Project
 */
class ProjectTable extends React.Component {

    componentWillMount() {
        this.props.projectTablePage(1);
        this.props.projectTableRows(10);
    }


    /**
     * Called when a row is clicked.
     * @param index
     */
    clicked(index) {
        //this.props.projectClicked(this.props.projects[index]);
    }


    /**
     * Render method.
     * @returns {XML}
     */
    render() {
        const {
            projects, page, nRows,
            projectTablePage,
            projectTableRows,
            deleteProject
        } = this.props;
        if ((page-1)*nRows+1 > projects.length) projectTablePage(1); //TODO fix side effect

        const projectTableMetaData = {
            page: page,
            nRows: nRows,
            objects: projects,
            rowMeta: [
                {label: 'Navn', field: 'name', width: '30%'},
                {label: 'Eier', field: 'creatorID', width: '30%'},
                {label: 'Leder', field: 'managerID', width: '30%'},
                {type: 'EDIT_LINK', link: PROJECT_GET_BY_ID, linkField: 'ID', width: '5%'},
                {type: 'DELETE_ACTION', action: deleteProject, param: 'ID', width: '5%'}
            ]
        };

        return (
            <GenericTable metaData={projectTableMetaData} tablePage={projectTablePage} tableRows={projectTableRows}/>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        page: state.tableReducer.project.page,
        nRows: state.tableReducer.project.nRows
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        projectTablePage: (page) => {
            dispatch(tablePage('project', page))
        },
        projectTableRows: (nRows) => {
            dispatch(tableRows('project', nRows));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTable);
