import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NextOfKin from "./common/NextOfKin";
import Address from "./common/Address";
import DriverPersonalDetails from "./DriverPersonalDetails";

const useStyles = makeStyles(theme => ({
    "@global": { body: { backgroundColor: "#FFF" } },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(5)
    }
}));

export default function DriversForm(formikProps) {
    const {
        values: {
            DriversFirstName,
            DriversMiddleName,
            DriversSurname,
            DriversMobile,
            DriversEmail,
            DriversLicenseNo,
            DriversLicenseExpiryDate,

            DriversHomeAddressLine1,
            DriversHomeAddressLine2,
            DriversHomePostalCode,
            DriversHomeCountry,
            DriversHomeState,
            DriversHomeCity,

            DriversPermanentAddressLine1,
            DriversPermanentAddressLine2,
            DriversPermanentPostalCode,
            DriversPermanentCountry,
            DriversPermanentState,
            DriversPermanentCity,

            //Next of Kin
            NextOfKinFirstName,
            NextOfKinMiddleName,
            NextOfKinLastName,
            NextOfKinPhoneNumber,

            NextOfKinHomeAddressLine1,
            NextOfKinHomeAddressLine2,
            NextOfKinHomePostalCode,
            NextOfKinHomeCountry,
            NextOfKinHomeState,
            NextOfKinHomeCity
        },
        errors,
        touched,
        handleChange,
        handleBlur,
        saveFormValuesInStore
    } = formikProps;

    const classes = useStyles();
    return (
        <div className={classes.form}>
            <br />
            <br />
            <DriverPersonalDetails
                DriversFirstName={DriversFirstName}
                DriversMiddleName={DriversMiddleName}
                DriversSurname={DriversSurname}
                DriversMobile={DriversMobile}
                DriversEmail={DriversEmail}
                DriversLicenseNo={DriversLicenseNo}
                DriversLicenseExpiryDate={DriversLicenseExpiryDate}
                errors={errors}
                handleChange={handleChange}
                touched={touched}
                handleBlur={handleBlur}
                saveFormValuesInStore={saveFormValuesInStore}
            />

            <Address
                Title="Home Address"
                AddressLine1="DriversHomeAddressLine1"
                AddressLine2="DriversHomeAddressLine2"
                Country="DriversHomeCountry"
                State="DriversHomeState"
                City="DriversHomeCity"
                PostalCode="DriversHomePostalCode"
                CountryValue={DriversHomeCountry}
                StateValue={DriversHomeState}
                CityValue={DriversHomeCity}
                AddressLine1Value={DriversHomeAddressLine1}
                AddressLine2Value={DriversHomeAddressLine2}
                PostalCodeValue={DriversHomePostalCode}
                errors={errors}
                handleChange={handleChange}
                touched={touched}
                handleBlur={handleBlur}
                saveFormValuesInStore={saveFormValuesInStore}
            />
            <Address
                Title="Permanent Address"
                AddressLine1="DriversPermanentAddressLine1"
                AddressLine2="DriversPermanentAddressLine2"
                Country="DriversPermanentCountry"
                State="DriversPermanentState"
                City="DriversPermanentCity"
                PostalCode="DriversPermanentPostalCode"
                CountryValue={DriversPermanentCountry}
                StateValue={DriversPermanentState}
                CityValue={DriversPermanentCity}
                AddressLine1Value={DriversPermanentAddressLine1}
                AddressLine2Value={DriversPermanentAddressLine2}
                PostalCodeValue={DriversPermanentPostalCode}
                errors={errors}
                handleChange={handleChange}
                touched={touched}
                handleBlur={handleBlur}
                saveFormValuesInStore={saveFormValuesInStore}
            />
            <NextOfKin
                title="Next of Kin"
                NextOfKinFirstName={NextOfKinFirstName}
                NextOfKinMiddleName={NextOfKinMiddleName}
                NextOfKinLastName={NextOfKinLastName}
                NextOfKinPhoneNumber={NextOfKinPhoneNumber}
                NextOfKinHomeCountry={NextOfKinHomeCountry}
                NextOfKinHomeState={NextOfKinHomeState}
                NextOfKinHomeCity={NextOfKinHomeCity}
                NextOfKinHomeAddressLine1={NextOfKinHomeAddressLine1}
                NextOfKinHomeAddressLine2={NextOfKinHomeAddressLine2}
                NextOfKinHomePostalCode={NextOfKinHomePostalCode}
                errors={errors}
                handleChange={handleChange}
                touched={touched}
                handleBlur={handleBlur}
                saveFormValuesInStore={saveFormValuesInStore}
            />
        </div>
    );
}