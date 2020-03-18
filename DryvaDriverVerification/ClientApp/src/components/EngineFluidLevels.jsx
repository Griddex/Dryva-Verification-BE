import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiInput from "./common/MultiInput";
import CheckBox from "./common/CheckBox";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold
    },
    expander: {
        marginTop: 30
    }
}));

export default function EngineFluidLevels(props) {
    const {
        values: { OtherEngineFluidLevels },
        errors,
        touched,
        handleBlur,
        handleChange,
        saveFormValuesInStore
    } = props;

    const classes = useStyles();
    return (
        <div className={classes.root} style={{ marginTop: 30 }}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        Engine/Fluid Levels
          </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <CheckBox
                            name="FuelGaugeWorking"
                            label="Fuel gauge working?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="OilLevelPressureGaugeWorking"
                            label="Oil Level/Pressure gauge working?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="TransmissionFluidLevel"
                            label="Transmission Fluid Level"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="PowerSteeringFluidLevel"
                            label="Power Steering Fluid Level Optimal?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="BrakeFluidLevel"
                            label="Brake Fluid Level Optimal?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="BatteryCharge"
                            label="Battery Charge Full?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="WindshieldWiperFluid"
                            label="Windshield and Wiper Fluid Functional?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="RadiatorFluidLevel"
                            label="Radiator Fluid Level Optimal?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="EngineWarningLights"
                            label="Engine Warning Lights Functional?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />

                        {MultiInput(
                            "OtherEngineFluidLevels",
                            "Other",
                            OtherEngineFluidLevels,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}