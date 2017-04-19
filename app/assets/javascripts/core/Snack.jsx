import React from 'react';
import { connect } from 'react-redux';
import { snackBar } from './../redux/actions/snackBarActions';
import SnackBar from 'material-ui/Snackbar';

/**
 * Root container for the application.
 * Contains {@link Sidebar}, {@link Header} and {@link SideMenu}
 */
class Snack extends React.Component {

    render() {
        const { isOpen, text, snackBar } = this.props;
        return (
            <SnackBar
                open={isOpen}
                message={text}
                autoHideDuration={4000}
                onRequestClose={snackBar.bind(null, false, '')}
            />
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isOpen: state.snackBarReducer.isOpen,
        text: state.snackBarReducer.text
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        snackBar: (bool, text) => {
            dispatch(snackBar(bool, text));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Snack);
