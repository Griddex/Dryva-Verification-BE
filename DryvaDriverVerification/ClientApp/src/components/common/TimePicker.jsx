import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker
} from "@material-ui/pickers";

export default function DatePicker(props) {
    const { label, handleChange } = props;
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
        //handleChange(date);
    };

    return (
        <div style={{ marginTop: 20 }}>
            <label style={{ marginBottom: 20 }}>
                <b>{label}</b>
            </label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    margin="normal"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        "aria-label": "change time"
                    }}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}