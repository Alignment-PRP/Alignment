import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CircularProgress from 'material-ui/CircularProgress';
import NotAuth from './../../layout/NotAuth';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.userdata
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (url) => {
            dispatch(push(url));
        }
    }
};

export const Auth = (roles) =>
    (Component) => {
        return connect(mapStateToProps, mapDispatchToProps)(
            class extends React.Component {

                render() {
                    const { user } = this.props;

                    if (user) {
                        if (roles.includes(user.ucName) || roles.length === 0) {
                            return <Component {...this.props}/>
                        } else {
                            return <NotAuth/>
                        }
                    } else {
                        return <CircularProgress />
                    }

                }
            }
        );
    };

export const AuthMin = (roles) =>
    (WrappedComponent) => {
        return connect(mapStateToProps, mapDispatchToProps)(
            class extends React.Component {

                render() {
                    const { user } = this.props;
                    if (user) {
                        if (roles.includes(user.ucName) || roles.length === 0) {
                            return <WrappedComponent {...this.props}/>
                        }
                        return null
                    } else {
                        return <CircularProgress/>
                    }

                }
            }
        );
    };
