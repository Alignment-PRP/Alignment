import React from 'react';
import {connect} from "react-redux";
import { getRequirementUsageStatistics } from "../../redux/actions/statisticsActions";
import DataTable from '../../core/table/DataTable';

/**
 * Class represents /admin/stats.
 * Parent: {@link Admin}
 */
class Statistics extends React.Component {

    /**
     * Called when the component did mount.
     */
    componentDidMount() {
        this.props.getRequirementUsageStatistics();
    }

    render() {
        const { requirementUsageStatistics } = this.props;

        const config = {
            table: 'statistics',
            data: requirementUsageStatistics,
            columns: [
                {label: 'Krav ID', property: 'RID', width: '33%'},
                {label: 'Krav Navn', property: 'name', width: '33%'},
                {label: 'Antall Prosjekter', property: 'PIDs', width: '33%'}
            ]
        };

        return (
            <div className="containerStatistics">
                <h2>Statistikk</h2>
                <p>
                    Antall ganger et krav er brukt i forskjellige prosjekter
                </p>
                <br/>
                <DataTable config={config} />
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
        getRequirementUsageStatistics: () => dispatch(getRequirementUsageStatistics())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);