import React from 'react';
import { connect } from 'react-redux';
import { changeStepperIndex, updateRequiredValues, updateOptionalValues, clearValues } from './../../redux/actions/requirementFormActions';
import Dialog from 'material-ui/Dialog';
import RequirementFormStepper from "../form/RequirementFormStepper";
import RequirementRequiredForm from "../form/RequirementRequiredForm";
import RequirementOptionalForm from "../form/RequirementOptionalForm";

class RequirementNewDialog extends React.Component {

    constructor(props) {
        super(props);

        this.renderForm = this.renderForm.bind(this);
    }

    renderForm() {
        const {
            stepperIndex, categories, users, structure,
            changeStepperIndex, updateRequiredValues, updateOptionalValues,
            onRequestClose
        } = this.props;
        switch (stepperIndex) {
            case 0:
                return (
                    <RequirementRequiredForm
                        categories={categories}
                        users={users}
                        onSubmit={(values) => {
                            changeStepperIndex(stepperIndex + 1);
                            updateRequiredValues(values);
                        }}
                        handleClose={() => {
                            onRequestClose();
                        }}
                    />
                );
            case 1:
                return (
                    <RequirementOptionalForm
                        structure={structure}
                        onSubmit={(values)  => {
                            updateOptionalValues(values);
                        }}
                        back={() => {
                            changeStepperIndex(stepperIndex - 1);
                        }}
                        handleClose={() => {
                            onRequestClose();
                        }}
                    />
                );
            default:
                return null
        }
    }

    render() {
        const {
            title, open, onRequestClose, users, categories, structure,
            stepperIndex, changeStepperIndex, updateRequiredValues, updateOptionalValues
        } = this.props;
        return (
            <Dialog title={title}
                    open={open} modal={false}
                    onRequestClose={onRequestClose}
                    autoDetectWindowHeight={false}
                    autoScrollBodyContent={false}
                    Style={{width: "100%"}}
            >
                <RequirementFormStepper index={stepperIndex} />

                {this.renderForm()}
            </Dialog>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        stepperIndex: state.requirementFormReducer.stepperIndex
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeStepperIndex: (index) => {
            dispatch(changeStepperIndex(index));
        },
        updateRequiredValues: (values) => {
            dispatch(updateRequiredValues(values));
        },
        updateOptionalValues: (values) => {
            dispatch(updateOptionalValues(values));
        },

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequirementNewDialog);
