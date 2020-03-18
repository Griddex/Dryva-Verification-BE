import React from "react";
import { ErrorMessage } from "formik";
import TextField from "@material-ui/core/TextField";

export default function Input(
    name,
    label,
    value,
    width,
    errors,
    touched,
    handleChange,
    handleBlur,
    saveFormValuesInStore = null,
    type = null,
    saveFormLoginInStore = null,
    setemailSettingsData = null,
    emailSettingsData = null,
    setValues = null
) {
    return (
        <div>
            <div style={{ width: width }}>
                <label htmlFor={name}>
                    <b>{label}</b>
                </label>
                <TextField
                    name={name}
                    label=""
                    value={value}
                    onChange={e => {
                        handleChange(e);
                        let inputValue = e.target.value;

                        if (setemailSettingsData !== null)
                            setemailSettingsData({
                                ...emailSettingsData,
                                [name]: inputValue
                            });
                        if (emailSettingsData !== null) setValues(emailSettingsData);
                    }}
                    onBlur={e => {
                        handleBlur(e);
                        let inputValue = e.target.value;
                        let inputName = e.target.name;

                        if (emailSettingsData !== null) setValues(emailSettingsData);

                        if (inputValue !== "" && saveFormValuesInStore !== null)
                            saveFormValuesInStore(inputName, inputValue);
                        if (inputValue !== "" && saveFormLoginInStore !== null)
                            saveFormLoginInStore(inputName, inputValue);
                    }}
                    error={Boolean(errors[name] && touched[name])}
                    margin="dense"
                    variant="outlined"
                    size="small"
                    type={type}
                    fullWidth
                />
            </div>
            <ErrorMessage
                style={{ color: "#DE1A1A" }}
                name={name}
                component="div"
                className="invalid-feedback"
            />
        </div>
    );
}