import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MultiInput from "./common/MultiInput";
import CheckBox from "./common/CheckBox";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold
    }
}));

export default function ExteriorChecks(props) {
    const {
        values: { OtherExteriorChecks },
        errors,
        touched,
        handleBlur,
        handleChange,
        saveFormValuesInStore
    } = props;

    const classes = useStyles();
    return (
        <div className={classes.root} style={{ marginTop: 20 }}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Exterior Checks</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <CheckBox
                            name="HeadlightsHiLow"
                            label="Headlights (hi/low) working?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="FoglampsHazardlamps"
                            label="Fog lamps/hazard lamps working?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="WindshieldCondition"
                            label="Windshield condition good?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="DirectionalSignalsFrontrear"
                            label="Directional Signals front/rear working?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="TaillightsRunninglights"
                            label="Tail lights/running lights working?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="BrakelightsBackUpLights"
                            label="Brake lights/Back-Up Lights working?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="TireconditionAirpressure"
                            label="Tire condition/air pressure okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="LugnutsTight"
                            label="Lugnuts Tight?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="WindowscanWindfreely"
                            label="Windows can wind freely?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="LuggageStoragedoorsEnginecompartmentPanels"
                            label="Luggage storage doors and engine compartment panels okay?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="ExteriorClean"
                            label="Exterior Clean?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />
                        <CheckBox
                            name="BodyconditionScratchesDingsDents"
                            label="Body condition/scratches/dings/dents absent?"
                            saveFormValuesInStore={saveFormValuesInStore}
                        />

                        {MultiInput(
                            "OtherExteriorChecks",
                            "Other",
                            OtherExteriorChecks,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            saveFormValuesInStore
                        )}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}