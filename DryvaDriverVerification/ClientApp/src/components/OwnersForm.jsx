import React from "react";
import Input from "./common/Input";
import Grid from "@material-ui/core/Grid";

export default function OwnersForm(props) {
    const {
        values: {
            NameOfOwner,
            OwnersHouseAddress,
            OwnersMobileNo,
            OwnersNextOfKinName
        },
        errors,
        touched,
        handleChange,
        handleBlur,
        saveFormValuesInStore
    } = props;

    return (
        <Grid container direction="column" justify="flex-start" spacing={10}>
            <Grid item>
                {Input(
                    "NameOfOwner",
                    "Name of Owner",
                    NameOfOwner,
                    500,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>
            <Grid item>
                {Input(
                    "OwnersHouseAddress",
                    "Owner's house address",
                    OwnersHouseAddress,
                    500,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>
            <Grid item>
                {Input(
                    "OwnersMobileNo",
                    "Owner's Mobile No.",
                    OwnersMobileNo,
                    200,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>

            <Grid item>
                {Input(
                    "OwnersNextOfKinName",
                    "Owner's Next of Kin Name",
                    OwnersNextOfKinName,
                    500,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    saveFormValuesInStore
                )}
            </Grid>
        </Grid>
    );
}