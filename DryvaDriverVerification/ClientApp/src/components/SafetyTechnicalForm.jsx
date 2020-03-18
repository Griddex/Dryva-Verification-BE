import React from "react";
import Container from "@material-ui/core/Container";
import EngineFluidLevels from "./EngineFluidLevels";
import InteriorChecks from "./InteriorChecks";
import ExteriorChecks from "./ExteriorChecks";
import SafetyTechnicalSummary from "./SafetyTechnicalSummary";

function SafetyTechnicalForm(props) {
    return (
        <Container>
            <br />
            <br />
            <EngineFluidLevels {...props} />
            <InteriorChecks {...props} />
            <ExteriorChecks {...props} />
            <SafetyTechnicalSummary {...props} />
        </Container>
    );
}

export default SafetyTechnicalForm;