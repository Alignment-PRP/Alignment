import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions.jsx";
import {getRequirementUsageStatistics} from "../../redux/actions/statisticsActions.jsx";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

/**
 * Class represents /admin/classes.
 * Parent: {@link Admin}
 * Children: {@link ClassForm} and {@link ClassTable}
 */
class Statistics extends React.Component {

    /**
     * Called when the component did mount.
     */
    componentDidMount() {
        this.props.changeSideMenuMode("HIDE");
        this.props.getRequirementUsageStatistics();
    }

    renderStats(){
        return this.props.requirementUsageStatistics.map((item, index) => {
           return (
               <TableRow key={index}>
                   <TableRowColumn>{item.RID}</TableRowColumn>
                   <TableRowColumn>{item.name}</TableRowColumn>
                   <TableRowColumn>{item.PIDs}</TableRowColumn>
               </TableRow>

           );

        })
    }

    render() {

        const {
        } = this.props;
        return (
            <div className="containerStatistics">
                <h2>Statistikk</h2>
                <p>
                    Antall ganger et krav er brukt i forskjellige prosjekter
                </p>
                <br/>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>
                                Requirement ID
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                Requirement Name
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                Number of Projects
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                    >
                        {this.renderStats()}
                    </TableBody>


                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        requirementUsageStatistics: state.statisticsReducer.projectsPerRequirement
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRequirementUsageStatistics: () => {
            dispatch(getRequirementUsageStatistics());
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);