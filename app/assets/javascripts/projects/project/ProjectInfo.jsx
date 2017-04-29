import React from 'react';
import { connect } from "react-redux";
import { getProjectMetaDataById, getProjectDataById } from "../../redux/actions/projectActions";

/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
class ProjectInfo extends React.Component {

    componentDidMount() {
        this.props.getProjectMetaDataById(this.props.params.id);
        this.props.getProjectDataById(this.props.params.id);

    }


    render() {

        return (
            <div>
                Prosjekt informasjon her.
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectMetaDataById: () => {
            dispatch(getPublicProjects());
        },
        getProjectDataById: () => {
            dispatch(getPublicProjects());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);