import React from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Button from "@material-ui/core/Button";

export const RegistrationSuccess = props => {
    const { history } = props;

    return (
        <div
            style={{
                width: "100%",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                padding: "200px"
            }}
        >
            <CheckBoxIcon htmlColor={"green"} style={{ fontSize: 70 }} />
            <h1>Registration Success!</h1>
            <br />
            <br />
            <Button
                onClick={() => history.replace(`/Auth/register`)}
                style={{ cursor: "pointer" }}
                variant="outlined"
            >
                Register Another...
      </Button>
        </div>
    );
};
export default RegistrationSuccess;