import React from 'react';
import { connect } from "react-redux";

/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
class ProjectClassAccess extends React.Component {



    render() {

        return (
            <div>
                Klassetabell her.
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectClassAccess);