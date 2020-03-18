export const TOGGLE_STEP_ERROR = "TOGGLE_STEP_ERROR";

export const toggleStepErrorAction = () => dispatch => {
    dispatch({
        type: TOGGLE_STEP_ERROR
    });
};