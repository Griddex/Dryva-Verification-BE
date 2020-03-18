import React from "react";
import { ErrorMessage } from "formik";
import TextField from "@material-ui/core/TextField";
import { Field } from "react-final-form";

export default function Field(
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
        <div>
            <div style={{ width: width }}>
                <label htmlFor={name}>{label}</label>
                <Field name={name} onChange={handleChange}>
                    {props => (
                        <TextField
                            name={props.input.name}
                            label=""
                            value={props.input.value}
                            onChange={props.input.onChange}
                            onBlur={e => {
                                handleBlur(e);
                                let inputValue = e.target.value;
                                let inputName = e.target.name;
                                if (inputValue !== "")
                                    saveFormValuesInStore(inputName, inputValue);
                            }}
                            error={Boolean(errors[name] && touched[name])}
                            margin="normal"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    )}
                </Field>
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