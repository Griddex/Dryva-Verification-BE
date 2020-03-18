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
    }
}));

export default function InteriorChecks(props) {
    const {
        values: { OtherInteriorChecks },
        errors,
        touched,
        handleBlur,
        handleChange,
        saveFormValuesInStore
    } = props;

    const classes = useStyles();
    return (
        <div className={classes.root} style={{ marginTop: 20 }}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Interior Checks</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div component="fieldset" className={classes.formControl}>
                        <CheckBox
                            name="Mirrors"
                            label="Mirrors okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="WindshieldWipers"
                            label="WindshieldWipers okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="Horn"
                            label="Horn okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="ParkingBrake"
                            label="ParkingBrake okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="Fans"
                            label="Fans okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="AirConditioning"
                            label="AirConditioning okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="RadioEquipmentCellphone"
                            label="RadioEquipment/Cellphone present?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="CantheDoorsbeOpenedFreely"
                            label="Can the Doors be Opened Freely?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="FluidsLeakingUnderBus"
                            label="Fluids Leaking Under Bus?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="InteriorLights"
                            label="Interior Lights Functional?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="DriverSeatBelts"
                            label="Driver SeatBelts Functional?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="PassengerSeats"
                            label="Passenger Seats okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="FireExtinguisher"
                            label="Fire Extinguisher Present?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="OtherEmergencyGear"
                            label="Other Emergency Gear Present?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="DestinationSignbox"
                            label="Destination Signbox Present?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="WindowsCleanandcanWindFreely"
                            label="Windows Clean and can wind freely?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="InteriorClean"
                            label="Interior Clean?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="WastebinAvailableOrEmptied"
                            label="Waste bin available/emptied?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />

                        {MultiInput(
                            "OtherInteriorChecks",
                            "Other",
                            OtherInteriorChecks,
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