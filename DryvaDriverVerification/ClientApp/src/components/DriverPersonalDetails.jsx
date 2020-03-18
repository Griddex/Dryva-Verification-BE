import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Input from "./../components/common/Input";
import DatePicker from "./common/DatePicker";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold
    }
}));

export default function DriverPersonalDetails(props) {
    const classes = useStyles();
    const {
        DriversFirstName,
        DriversMiddleName,
        DriversSurname,
        DriversMobile,
        DriversEmail,
        DriversLicenseNo,

        errors,
        touched,
        handleChange,
        handleBlur,
        saveFormValuesInStore
    } = props;

    return (
        <div style={{ marginTop: 20 }}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        Driver's Personal Details
          </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        {Input(
                            "DriversFirstName",
                            "Driver's First Name",
                            DriversFirstName,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "DriversMiddleName",
                            "Driver's Middle Name",
                            DriversMiddleName,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "DriversSurname",
                            "Driver's Surname",
                            DriversSurname,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "DriversMobile",
                            "Driver's Mobile Number",
                            DriversMobile,
                            200,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "DriversEmail",
                            "Driver's Email",
                            DriversEmail,
                            300,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "DriversLicenseNo",
                            "Driver's License Number",
                            DriversLicenseNo,
                            200,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        <DatePicker
                            name="DriversLicenseExpiryDate"
                            label="Driver's License Expiry Date"
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}