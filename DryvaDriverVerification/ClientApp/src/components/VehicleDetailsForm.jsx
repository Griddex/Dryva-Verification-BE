import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "./common/Input";
import Select from "./common/Select";
import DatePicker from "./common/DatePicker";
import {
    VehicleTypes,
    VehicleMakes,
    VehicleManufactureYears
} from "./../services/vehicleService";

export default function VehicleDetailsForm(props) {
    const {
        values: {
            VehicleType,
            VehicleMake,
            YearOfManufacture,
            ChassisNo,
            EngineNo
        },
        errors,
        touched,
        handleChange,
        handleBlur,
        saveFormValuesInStore
    } = props;

    return (
        <Grid container direction="column" spacing={4}>
            <Grid item xs={3}>
                {Select(
                    "VehicleType",
                    "Vehicle Type",
                    VehicleType,
                    VehicleTypes,
                    300,
                    errors,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>
            <Grid item xs={3}>
                {Select(
                    "VehicleMake",
                    "Vehicle Make",
                    VehicleMake,
                    VehicleMakes,
                    300,
                    errors,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>
            <Grid item xs={3}>
                {Select(
                    "YearOfManufacture",
                    "Year of Manufacture",
                    YearOfManufacture,
                    VehicleManufactureYears,
                    100,
                    errors,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>

            <Grid item>
                {Input(
                    "ChassisNo",
                    "Chassis Number",
                    ChassisNo,
                    300,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>
            <Grid item>
                {Input(
                    "EngineNo",
                    "Engine Number",
                    EngineNo,
                    300,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>
            <Grid item xs={3}>
                <DatePicker
                    name="MOTExpiry"
                    label="MOT Expiry"
                    saveFormValuesInStore={saveFormValuesInStore}
                />
            </Grid>
            <Grid item xs={3}>
                <DatePicker
                    name="InsuranceExpiry"
                    label="Insurance Expiry"
                    saveFormValuesInStore={saveFormValuesInStore}
                />
            </Grid>
        </Grid>
    );
}