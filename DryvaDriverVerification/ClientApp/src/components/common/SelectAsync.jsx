import React from "react";
import Select from "react-select";

export default function SelectAsync(
    name,
    label,
    value,
    values,
    width,
    errors,
    handleChange
) {
    const [selectedOption, setSelectedOption] = useState("");
    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
    };
    return (
        <div style={{ marginTop: 20 }}>
            <label htmlFor={name}>{label}</label>
            <div className="form-group">
                <Select
                    name={name}
                    value={selectedOption}
                    onChange={handleChange}
                    options={values.map((v, i) => ({ label: v, value: i }))}
                    isSearchable
                />
            </div>
        </div>
    );
}