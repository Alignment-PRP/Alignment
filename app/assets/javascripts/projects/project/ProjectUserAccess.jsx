import React from 'react';
import { connect } from "react-redux";
import { getUsersWithClass } from "./../../redux/actions/userActions";
import { getUsersThatHaveAccess, insertHasAccess, removeHasAccess } from "../../redux/actions/projectActions";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DataTable from '../../core/table/DataTable';
import UserSelectAdd from './UserSelectAdd';
import CircularProgress from 'material-ui/CircularProgress';
/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
class ProjectUserAccess extends React.Component {

    componentDidMount() {
        this.props.getUsersThatHaveAccess(this.props.id);
        this.props.getUsersWithClass();
    }

    handleChange (event, index, value) {
        const data = {
            userName: value
        };
        this.props.insertHasAccess(this.props.id, data);
    }

    render() {


        const config = {
            table: 'users',
            title: 'kake',
            data: this.props.users,
            columns: [
                {label: 'Klasse', property: 'ucName', width: '15%'},
                {label: 'Brukernavn', property: 'USERNAME', width: '15%'},
                {label: 'Fornavn', property: 'firstName', width: '15%'},
                {label: 'Etternavn', property: 'lastName', width: '15%'},
                {label: 'Epost', property: 'email', width: '20%'},
                {type: 'DELETE_ACTION', action: (user) => {
                    const data = {
                        userName: user.USERNAME
                    };
                    this.props.removeHasAccess(this.props.id, data );
                },
                    width: '24px'
                }
            ],
            toolbar: {
                title: 'Brukere',
                search: 'USERNAME|ucName',
                render: () => {
                    return (
                        <ToolbarGroup>
                            {this.props.allUsers && this.props.users ?
                                < UserSelectAdd
                                    classes={
                                        this.props.allUsers.filter(c => {
                                                for(let i = 0; i < this.props.users.length; i++){
                                                    if (this.props.users[i].USERNAME == c.USERNAME){
                                                        return false;
                                                    }
                                                }
                                                return true;
                                            }
                                        )}
                                    handleChange={this.handleChange.bind(this)} /> : <CircularProgress/>
                            }

                        </ToolbarGroup>
                    );
                }
            }
        };

        return (
            <div className="container">
                <div className="table">
                    <DataTable config={config}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.projectReducer.usersData,
        allUsers: state.userReducer.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersThatHaveAccess: (id) => {
            dispatch(getUsersThatHaveAccess(id));
        },
        insertHasAccess: (id, data) => {
            dispatch(insertHasAccess(id, data));
        },
        removeHasAccess: (id, data) => {
            dispatch(removeHasAccess(id, data));
        },
        getUsersWithClass: () => {
            dispatch(getUsersWithClass())
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserAccess);