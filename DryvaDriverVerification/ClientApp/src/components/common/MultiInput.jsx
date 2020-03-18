import React from "react";
import { ErrorMessage } from "formik";
import TextField from "@material-ui/core/TextField";

export default function MultiInput(
    name,
    label,
    value,
    width,
    errors,
    touched,
    handleChange,
    handleBlur,
    saveFormValuesInStore = null
) {
    return (
        <div style={{ marginTop: 20, width: width }}>
            <label htmlFor={name}>
                <b>{label}</b>
            </label>
            <div>
                <TextField
                    name={name}
                    label=""
                    value={value}
                    onChange={handleChange}
                    onBlur={e => {
                        handleBlur(e);
                        let inputValue = e.target.value;
                        let inputName = e.target.name;
                        if (inputValue !== "") saveFormValuesInStore(inputName, inputValue);
                    }}
                    error={Boolean(errors[name] && touched[name])}
                    margin="normal"
                    variant="outlined"
                    rows="10"
                    size="small"
                    multiline
                    fullWidth
                />
                <ErrorMessage
                    name={name}
                    component="div"
                    className="invalid-feedback"
                />
            </div>
        </div>
    );
}