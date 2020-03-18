import React from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

const unauthorized = () => {
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
            <CancelPresentationIcon htmlColor={"red"} style={{ fontSize: 70 }} />
            <h1>Unauthorized!</h1>
        </div>
    );
};

export default unauthorized;