import React from 'react';
import {Step, StepLabel, Stepper} from "material-ui";

class RequirementFormStepper extends React.Component {

    render() {
        const { index } = this.props;

        return (
            <Stepper activeStep={index}>
                <Step>
                    <StepLabel>Obligatorisk</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Valgfritt</StepLabel>
                </Step>
            </Stepper>
        );
    }

}

export default RequirementFormStepper;
