import React from 'react';
import {connect} from "react-redux";
import GenericTable from '../core/table/GenericTable.jsx';
import {PROJECT_GET_BY_ID} from '../config.jsx';


/**
 * Class represents a table with projects.
 * @see Projects
 * @see Project
 */
class ProjectTable extends React.Component {

    /**
     * Render method.
     * @returns {XML}
     */
    render() {
        const {
            projects,
            deleteProject
        } = this.props;
        //if ((page-1)*nRows+1 > projects.length) projectTablePage(1); //TODO fix side effect

        const projectTableMetaData = {
            table: 'project',
            objects: projects,
            rowMeta: [
                {label: 'Navn', field: 'name', width: '30%'},
                {label: 'Eier', field: 'creatorID', width: '25%'},
                {label: 'Leder', field: 'managerID', width: '25%'},
                {type: 'EDIT_LINK', link: PROJECT_GET_BY_ID, linkField: 'ID', width: '7%'},
                {type: 'DELETE_ACTION', action: deleteProject, param: 'ID', width: '7%'}
            ]
        };

        return (
            <GenericTable metaData={projectTableMetaData} />
        );
    }

}

export default ProjectTable;
