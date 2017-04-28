import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RequirementForm from '../form/RequirementForm';

class RequirementNewDialog extends React.Component {

    render() {
        const { title, open, onRequestClose, users, categories, structure } = this.props;
        return (
            <Dialog title={title}
                    open={open} modal={false}
                    onRequestClose={onRequestClose}
                    autoDetectWindowHeight={false}
                    autoScrollBodyContent={false}
                    Style={{width: "100%"}}
            >
                <RequirementForm categories={categories}
                                 structure={structure}
                                 users={users}
                                 onSubmit={handleSubmit}
                                 handleClose={onRequestClose}
                                 disabled={false}
                                 handleCreate={()=>{}}
                                 handleClear={()=>{}}/>
            </Dialog>
        );
    }

}

mapStateToProps = (state) => {
    return {

    }
};

mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequirementNewDialog);
