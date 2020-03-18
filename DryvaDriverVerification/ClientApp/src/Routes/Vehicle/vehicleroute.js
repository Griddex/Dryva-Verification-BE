import React from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Container from "@material-ui/core/Container";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import InspectorForm from "./../../components/InspectorForm";
import OwnersForm from "./../../components/OwnersForm";
import DriversForm from "./../../components/DriversForm";
import VehicleDetailsForm from "./../../components/VehicleDetailsForm";
import SafetyTechnicalForm from "./../../components/SafetyTechnicalForm";
import StoreInitialValues from "./../../store/store";
import ValidationSchema from "./../../ValidationSchema/validationSchema";
import VerificationImagesForm from "../../components/VerificationImagesForm";
import ReviseForm from "../../components/ReviseForm";
import { connect } from "react-redux";
import { submitAction } from "../../actions/submitAction";
import { sendValuesToStoreAction } from "./../../actions/sendValuesToStoreAction";
import { toggleStepErrorAction } from "./../../actions/toggleStepErrorAction";

const useStyles = makeStyles(theme => ({
    root: {
        width: "90%"
    },
    button: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

function getSteps() {
    return [
        "Inspector's Details",
        "Owner's Details",
        "Driver's Details",
        "Vehicle Details and Documentation",
        "Safety and Technical",
        "Verification Images",
        "Revision"
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return "Inspector's Details";
        case 1:
            return "Owner's Details";
        case 2:
            return "Driver's Details";
        case 3:
            return "Vehicle Details and Documentation";
        case 4:
            return "Safety and Technical";
        case 5:
            return "Verification Images";
        case 6:
            return "Revision";
        default:
            return "Unknown step";
    }
}

function VehicleRoute(reduxProps) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    function isStepOptional(step) {
        return step === 5;
    }

    function isStepFailed(step) {
        return step === 100;
    }

    function isStepSkipped(step) {
        return skipped.has(step);
    }

    function handleNext() {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(skipped.values());
            newSkipped.delete(activeStep);
        }
        if (activeStep === steps.length - 1) {
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleSkip() {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }
        setSkipped(prevSkipped => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleReset() {
        setActiveStep(0);
    }

    function divVisibility(activeStep, steps) {
        return activeStep === steps.length - 1 ? "none" : "inline-block";
    }

    function SubmitFormControls(reduxProps) {
        const { Submitting } = reduxProps;

        return (
            <div
                style={{
                    marginTop: 30
                }}
            >
                <Button onClick={handleReset} className={classes.button}>
                    Reset
        </Button>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                >
                    Back
        </Button>
                {Submitting && (
                    <img
                        alt="Loading..."
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    />
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => {
                        const result = window.confirm(`Submit Form?`);
                        if (!result) return;
                        reduxProps.sendFormToServer();
                    }}
                    className={classes.button}
                >
                    Submit
        </Button>
            </div>
        );
    }

    function renderForm(activeStep, reduxProps) {
        const { saveFormValuesInStore } = reduxProps;

        return (
            <Formik
                className={classes.form}
                initialValues={StoreInitialValues}
                validationSchema={ValidationSchema}
                validateOnBlur={true}
                validateOnChange={false}
            >
                {formikProps => {
                    const formProps = { ...formikProps, saveFormValuesInStore };
                    switch (activeStep) {
                        case 0:
                            return <InspectorForm {...formProps} />;
                        case 1:
                            return <OwnersForm {...formProps} />;
                        case 2:
                            return <DriversForm {...formProps} />;
                        case 3:
                            return <VehicleDetailsForm {...formProps} />;
                        case 4:
                            return <SafetyTechnicalForm {...formProps} />;
                        case 5:
                            return <VerificationImagesForm {...formProps} />;
                        case 6:
                            return (
                                <div>
                                    <ReviseForm {...formProps} {...reduxProps} />
                                    <SubmitFormControls {...reduxProps} />
                                </div>
                            );
                        default:
                            return <h1>Congratulations!!!</h1>;
                    }
                }}
            </Formik>
        );
    }

    return (
        <Container maxwidth="lg" className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    if (isStepFailed(index)) {
                        labelProps.error = true;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Container maxWidth="lg">{renderForm(activeStep, reduxProps)}</Container>
            <div>
                <div
                    style={{
                        marginTop: 30,
                        display: divVisibility(activeStep, steps)
                    }}
                >
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                    >
                        Back
          </Button>
                    {isStepOptional(activeStep) && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSkip}
                            className={classes.button}
                        >
                            Skip
            </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNext()}
                        className={classes.button}
                    >
                        Next
          </Button>
                </div>
            </div>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        formErrors: state.saveOrSubmitReducer.formErrors,
        Submitting: state.saveOrSubmitReducer.Submitting,
        saveAndTechnicalValues: {
            FuelGaugeWorking: state.saveOrSubmitReducer.FuelGaugeWorking,
            OilLevelPressureGaugeWorking:
                state.saveOrSubmitReducer.OilLevelPressureGaugeWorking,
            TransmissionFluidLevel: state.saveOrSubmitReducer.TransmissionFluidLevel,
            PowerSteeringFluidLevel:
                state.saveOrSubmitReducer.PowerSteeringFluidLevel,
            BrakeFluidLevel: state.saveOrSubmitReducer.BrakeFluidLevel,
            BatteryCharge: state.saveOrSubmitReducer.BatteryCharge,
            WindshieldWiperFluid: state.saveOrSubmitReducer.WindshieldWiperFluid,
            RadiatorFluidLevel: state.saveOrSubmitReducer.RadiatorFluidLevel,
            FluidsLeakingUnderBus: state.saveOrSubmitReducer.FluidsLeakingUnderBus,
            EngineWarningLights: state.saveOrSubmitReducer.EngineWarningLights,
            OtherEngineFluidLevels: state.saveOrSubmitReducer.OtherEngineFluidLevels,

            HeadlightsHiLow: state.saveOrSubmitReducer.HeadlightsHiLow,
            FoglampsHazardlamps: state.saveOrSubmitReducer.FoglampsHazardlamps,
            WindshieldCondition: state.saveOrSubmitReducer.WindshieldCondition,
            DirectionalSignalsFrontrear:
                state.saveOrSubmitReducer.DirectionalSignalsFrontrear,
            TaillightsRunninglights:
                state.saveOrSubmitReducer.TaillightsRunninglights,
            BrakelightsBackUpLights:
                state.saveOrSubmitReducer.BrakelightsBackUpLights,
            TireconditionAirpressure:
                state.saveOrSubmitReducer.TireconditionAirpressure,
            LugnutsTight: state.saveOrSubmitReducer.LugnutsTight,
            WindowscanWindfreely: state.saveOrSubmitReducer.WindowscanWindfreely,
            LuggageStoragedoorsEnginecompartmentPanels:
                state.saveOrSubmitReducer.LuggageStoragedoorsEnginecompartmentPanels,
            ExteriorClean: state.saveOrSubmitReducer.ExteriorClean,
            BodyconditionScratchesDingsDents:
                state.saveOrSubmitReducer.BodyconditionScratchesDingsDents,
            OtherExteriorChecks: state.saveOrSubmitReducer.OtherExteriorChecks,

            Mirrors: state.saveOrSubmitReducer.Mirrors,
            WindshieldWipers: state.saveOrSubmitReducer.WindshieldWipers,
            Horn: state.saveOrSubmitReducer.Horn,
            ParkingBrake: state.saveOrSubmitReducer.ParkingBrake,
            Fans: state.saveOrSubmitReducer.Fans,
            AirConditioning: state.saveOrSubmitReducer.AirConditioning,
            RadioEquipmentCellphone:
                state.saveOrSubmitReducer.RadioEquipmentCellphone,
            CantheDoorsbeOpenedFreely:
                state.saveOrSubmitReducer.CantheDoorsbeOpenedFreely,
            InteriorLights: state.saveOrSubmitReducer.InteriorLights,
            DriverSeatBelts: state.saveOrSubmitReducer.DriverSeatBelts,
            PassengerSeats: state.saveOrSubmitReducer.PassengerSeats,
            FireExtinguisher: state.saveOrSubmitReducer.FireExtinguisher,
            OtherEmergencyGear: state.saveOrSubmitReducer.OtherEmergencyGear,
            DestinationSignbox: state.saveOrSubmitReducer.DestinationSignbox,
            WindowsCleanandcanWindFreely:
                state.saveOrSubmitReducer.WindowsCleanandcanWindFreely,
            InteriorClean: state.saveOrSubmitReducer.InteriorClean,
            WastebinAvailableOrEmptied:
                state.saveOrSubmitReducer.WastebinAvailableOrEmptied,
            OtherInteriorChecks: state.saveOrSubmitReducer.OtherInteriorChecks,
            Images: state.saveOrSubmitReducer.Images
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveFormValuesInStore: (name, value) =>
            dispatch(sendValuesToStoreAction(name, value)),
        sendFormToServer: () => dispatch(submitAction()),
        toggleStepError: () => dispatch(toggleStepErrorAction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleRoute);