import React from 'react';
import { connect } from 'react-redux';

import { changeSideMenuMode } from '../redux/actions/sideMenuActions.jsx';

class SideMenu extends React.Component {


    renderMenu() {
        switch(this.props.mode) {
            case "FILTER":
               return (
                <div>
                    <h2>Filter</h2>
                    <p>Sikkerhet<input type="checkbox" name="" value=""/></p>
                    <p>Pålitelighet<input type="checkbox" name="" value=""/></p>
                </div>
               );
                break;
            default:
                return (
                    <div>
                        <h2>Menu</h2>
                        <p>Legg til stuff?</p>
                    </div>
                );
        }

    }

    render() {
        return (
            <div id="sidemenu">
                {this.renderMenu()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);