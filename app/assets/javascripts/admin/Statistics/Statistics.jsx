import React from 'react';
import {connect} from "react-redux";
import {getRequirementUsageStatistics} from "../redux/actions/statisticsActions.jsx";

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


    render() {
        const {
        } = this.props;
        return (
            <div className="containerStatistics">
                <ul>
                    <li>{this.props.getRequirementUsageStatistics}</li>
                </ul>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getRequirementUsageStatistics: state.statisticsReducer.projectsPerRequirement
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRequirementUsageStatistics: () => {
            dispatch(getRequirementUsageStatistics());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
