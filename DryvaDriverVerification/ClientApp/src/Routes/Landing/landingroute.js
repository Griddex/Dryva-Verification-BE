import React from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import Button from "@material-ui/core/Button";
import history from "./../../services/historyService";

function LandingRoute(props) {
    return (
        <div>
            <Logo />
            <h1>Welcome to Dryva's Driver Verification</h1>
            <br />
            <Button
                onClick={() => history.push("/login")}
                style={{ cursor: "pointer" }}
                className="btn btn-secondary"
                width={800}
                variant="contained"
                color="primary"
            >
                Login
      </Button>
        </div>
    );
}

export default LandingRoute;