import React from 'react';
import Dialog from 'material-ui/Dialog';
import RequirementForm from '../form/RequirementForm';

class RequirementNewDialog extends React.Component {

    render() {
        const { handleSubmit, title, open, onRequestClose, users, categories, structure } = this.props;
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
                                 disabled={false}
                                 handleCreate={()=>{}}
                                 handleClear={()=>{}}/>
            </Dialog>
        );
    }

}

export default RequirementNewDialog;
