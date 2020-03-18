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

export default function Address(props) {
    const classes = useStyles();
    const {
        Title,
        AddressLine1,
        AddressLine2,
        Country,
        State,
        City,
        PostalCode,
        CountryValue,
        StateValue,
        CityValue,
        AddressLine1Value,
        AddressLine2Value,
        PostalCodeValue,
        errors,
        handleChange,
        touched,
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
                    <Typography className={classes.heading}>{Title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        {Input(
                            AddressLine1,
                            "Address Line1",
                            AddressLine1Value,
                            450,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            AddressLine2,
                            "Address Line2",
                            AddressLine2Value,
                            450,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}

                        {Select(
                            Country,
                            "Country",
                            CountryValue,
                            Countries,
                            220,
                            errors,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Select(
                            State,
                            "State",
                            StateValue,
                            States,
                            220,
                            errors,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Select(
                            City,
                            "City",
                            CityValue,
                            Cities,
                            200,
                            errors,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                        {Input(
                            PostalCode,
                            "PostalCode",
                            PostalCodeValue,
                            150,
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