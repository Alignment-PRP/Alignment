import React from 'react';
import {connect} from "react-redux";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ProjectTableRow from './ProjectTableRow.jsx';
import {projectTablePage, projectTableRows} from './../../redux/actions/projectTableActions.jsx';
import { tablePage, tableRows } from './../../redux/actions/tableActions.jsx';

import GenericTable from '../../core/table/GenericTable.jsx';
import { projectTableMetaData } from './../../core/tableMetaData.jsx';



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
            projectTableRows
        } = this.props;
        if ((page-1)*nRows+1 > projects.length) projectTablePage(1); //TODO fix side effect

        let tableData = {
            ...projectTableMetaData,
            objects: projects,
            page: page,
            nRows: nRows
        };

        return (
            <GenericTable metaData={tableData} tablePage={projectTablePage} tableRows={projectTableRows}/>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        page: state.projectTableReducer.page,
        nRows: state.projectTableReducer.nRows
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        projectTablePage: (page) => {
            dispatch(projectTablePage(page))
        },
        projectTableRows: (nRows) => {
            dispatch(projectTableRows(nRows));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTable);
