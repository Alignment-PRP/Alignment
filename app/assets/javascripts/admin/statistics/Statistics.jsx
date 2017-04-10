import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "./../../redux/actions/sideMenuActions";
import { getRequirementUsageStatistics } from "../../redux/actions/statisticsActions";
import GenericTable from './../../core/table/GenericTable';

/**
 * Class represents /admin/stats.
 * Parent: {@link Admin}
 */
class Statistics extends React.Component {

    /**
     * Called when the component did mount.
     */
    componentDidMount() {
        this.props.changeSideMenuMode("HIDE");
        this.props.getRequirementUsageStatistics();
    }

    render() {
        const { requirementUsageStatistics } = this.props;

        const metaData = {
            table: 'statistics',
            objects: requirementUsageStatistics,
            rowMeta: [
                {label: 'Krav ID', field: 'RID', width: '33%'},
                {label: 'Krav Navn', field: 'name', width: '33%'},
                {label: 'Antall Prosjekter', field: 'PIDs', width: '33%'}
            ]
        };

        return (
            <div className="containerStatistics">
                <h2>Statistikk</h2>
                <p>
                    Antall ganger et krav er brukt i forskjellige prosjekter
                </p>
                <br/>
                <GenericTable metaData={metaData} />
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