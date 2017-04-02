import React from 'react';
import {connect} from "react-redux";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ProjectTableRow from './ProjectTableRow.jsx';
import {projectTablePage, projectTableRows} from './../../redux/actions/projectTableActions.jsx';

/**
 * Class represents a table with projects.
 * @see Projects
 * @see ProjectTableRow
 * @see Project
 */
class ProjectTable extends React.Component {

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
        return (
            <Table>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Navn</TableHeaderColumn>
                        <TableHeaderColumn>Eier</TableHeaderColumn>
                        <TableHeaderColumn>Leder</TableHeaderColumn>
                        <TableHeaderColumn/>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                >
                    {projects.slice((page-1)*nRows, page*nRows).map((project, index) => {return <ProjectTableRow project={project} key={index}/>} )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableRowColumn>
                            {/*TODO add row selection*/}
                            <span>{(page-1)*nRows+1}-{page*nRows < projects.length ? page*nRows : projects.length}of{projects.length}</span>
                            <IconButton onClick={() => projectTablePage(page > 1 ? page - 1 : 1)}>
                                <FontIcon className="material-icons">keyboard_arrow_left</FontIcon>
                            </IconButton>
                            <IconButton onClick={() => projectTablePage(page < projects.length / nRows ? page + 1 : page)}>
                                <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        page: state.projectTableReducer.page,
        nRows: state.projectTableReducer.nRows,
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
