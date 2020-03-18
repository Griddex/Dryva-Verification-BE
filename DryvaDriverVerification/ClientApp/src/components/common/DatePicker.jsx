import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

export default function DatePicker(props) {
    const { name, label, saveFormValuesInStore } = props;
    const [date, setDate] = React.useState(new Date());

    const handleDateChange = date => {
        setDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div style={{ width: 200 }}>
                <label>
                    <b>{label}</b>
                </label>
                <KeyboardDatePicker
                    name={name}
                    format="dd-MMM-yyyy"
                    margin="normal"
                    value={date}
                    onChange={date => {
                        handleDateChange(date);
                        saveFormValuesInStore(name, date);
                    }}
                    KeyboardButtonProps={{
                        "aria-label": "change date"
                    }}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
}