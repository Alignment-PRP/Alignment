import React from 'react';
import { connect } from "react-redux";
import { getUserClasses } from "./../../redux/actions/userActions";
import { getClassesThatHaveAccess, removeHasAccess, insertHasAccess } from "./../../redux/actions/projectActions";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DataTable from '../../core/table/DataTable';
import Ellipsis from "../../core/popover/Ellipsis";
import { Field, reduxForm } from 'redux-form';
import ClassSelectAdd from './ClassSelectAdd';
import CircularProgress from 'material-ui/CircularProgress';
/**
 * Class represents /admin/users.
 * Parent: {@link Admin}
 * Children: {@link UserForm}
 */
class ProjectClassAccess extends React.Component {

    componentDidMount() {
        this.props.getClassesThatHaveAccess(this.props.id);
        this.props.getUserClasses();
        console.log(this.props);
    }
    handleChange (event, index, value) {
            const data = {
                userClass: value
            };
            this.props.insertHasAccess(this.props.id, data);
    }

    render() {


        const config = {
            table: 'userClasses',
            data: this.props.classes,
            columns: [
                {label: 'Navn', property: 'NAME', width: '25%'},
                {label: 'Beskrivelse', property: 'description', width: '61%', wrap: {
                    lines: 3,
                    ellipsis: (userClass) => {
                        const props = {
                            component: 'userClasses',
                            object: userClass,
                            property: 'description'
                        };
                        return <Ellipsis {...props} />
                    }
                }
                },
                {type: 'DELETE_ACTION', action: (uClass) => {
                        const data = {
                            userClass: uClass.NAME
                        };
                        this.props.removeHasAccess(this.props.id, data );
                    },
                    width: '24px'
                }
            ],
            toolbar: {
                title: 'Brukerklasser',
                search: 'NAME',
                render: () => {
                    return (
                        <ToolbarGroup >
                            {this.props.allClasses && this.props.classes ?
                                < ClassSelectAdd
                                    classes={
                                        this.props.allClasses.filter(c => {
                                                for(let i = 0; i < this.props.classes.length; i++){
                                                    if (this.props.classes[i].NAME == c.NAME){
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
        classes: state.projectReducer.classesData,
        allClasses: state.userReducer.userClasses
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClassesThatHaveAccess: (id) => {
            dispatch(getClassesThatHaveAccess(id));
        },
        insertHasAccess: (id, data) => {
            dispatch(insertHasAccess(id, data));
        },
        getUserClasses: () => {
            dispatch(getUserClasses());
        },
        removeHasAccess: (id, data) => {
            dispatch(removeHasAccess(id, data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectClassAccess);