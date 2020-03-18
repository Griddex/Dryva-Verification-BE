import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

export default function Select(
    name,
    label,
    value,
    values,
    width,
    errors,
    handleChange,
    handleBlur,
    saveFormValuesInStore = null,
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
                        let inputName = e.target.name;

                        if (setemailSettingsData !== null)
                            setemailSettingsData({
                                ...emailSettingsData,
                                [name]: inputValue
                            });

                        if (emailSettingsData !== null) setValues(emailSettingsData);

                        if (inputValue !== "" && saveFormValuesInStore !== null)
                            saveFormValuesInStore(inputName, inputValue);
                    }}
                    onBlur={e => {
                        handleBlur(e);
                        let inputValue = e.target.value;
                        let inputName = e.target.name;

                        if (setemailSettingsData !== null)
                            setemailSettingsData({
                                ...emailSettingsData,
                                [name]: inputValue
                            });

                        if (emailSettingsData !== null) setValues(emailSettingsData);

                        if (inputValue !== "" && saveFormValuesInStore !== null)
                            saveFormValuesInStore(inputName, inputValue);
                    }}
                    margin="dense"
                    variant="outlined"
                    size="small"
                    fullWidth
                    select
                >
                    {values.map((v, i) => {
                        return (
                            <MenuItem key={i} value={v}>
                                {v}
                            </MenuItem>
                        );
                    })}
                </TextField>
            </div>
        </div>
    );
}