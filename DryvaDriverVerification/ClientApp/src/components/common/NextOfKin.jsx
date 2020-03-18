import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Input from "./Input";
import Select from "./Select";
import Countries from "./../../services/countriesService";
import States from "../../services/statesService";
import Cities from "./../../services/citiesService";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold
    }
}));

export default function NextOfKin(props) {
    const classes = useStyles();
    const {
        NextOfKinFirstName,
        NextOfKinMiddleName,
        NextOfKinLastName,
        NextOfKinPhoneNumber,
        NextOfKinHomeCountry,
        NextOfKinHomeState,
        NextOfKinHomeCity,
        NextOfKinHomeAddressLine1,
        NextOfKinHomeAddressLine2,
        NextOfKinHomePostalCode,
        errors,
        touched,
        handleChange,
        handleBlur,
        saveFormValuesInStore
    } = props;

    return (
        <div className={classes.root} style={{ marginTop: 20 }}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Next of Kin</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        {Input(
                            "NextOfKinFirstName",
                            "First Name",
                            NextOfKinFirstName,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "NextOfKinMiddleName",
                            "Middle Name",
                            NextOfKinMiddleName,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "NextOfKinLastName",
                            "Last Name",
                            NextOfKinLastName,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "NextOfKinHomeAddressLine1",
                            "Address Line1",
                            NextOfKinHomeAddressLine1,
                            450,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "NextOfKinHomeAddressLine2",
                            "Address Line2",
                            NextOfKinHomeAddressLine2,
                            450,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}

                        {Select(
                            "NextOfKinHomeCountry",
                            "Country",
                            NextOfKinHomeCountry,
                            Countries,
                            220,
                            errors,
                            handleChange
                        )}
                        {Select(
                            "NextOfKinHomeState",
                            "State",
                            NextOfKinHomeState,
                            States,
                            220,
                            errors,
                            handleChange
                        )}
                        {Select(
                            "NextOfKinHomeCity",
                            "City",
                            NextOfKinHomeCity,
                            Cities,
                            200,
                            errors,
                            handleChange
                        )}
                        {Input(
                            "NextOfKinHomePostalCode",
                            "PostalCode",
                            NextOfKinHomePostalCode,
                            150,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            "NextOfKinPhoneNumber",
                            "Phone Number",
                            NextOfKinPhoneNumber,
                            200,
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