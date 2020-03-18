export const SUBMIT_ROLES_COMMENCE = "SUBMIT_ROLES_COMMENCE";
export const SUBMIT_ROLES_SUCCESS = "SUBMIT_ROLES_SUCCESS";
export const SUBMIT_ROLES_FAILURE = "SUBMIT_ROLES_FAILURE";
export const LOAD_ROLES_COMMENCE = "LOAD_ROLES_COMMENCE";
export const LOAD_ROLES_SUCCESS = "LOAD_ROLES_SUCCESS";
export const LOAD_ROLES_FAILURE = "LOAD_ROLES_FAILURE";

export const onRowAddAction = newRole => (dispatch, getState, http) => {
    const { httpOthers } = http;

    dispatch({
        type: SUBMIT_ROLES_COMMENCE,
        payload: { Submitting: true, formErrors: [] }
    });
    httpOthers(
        "post",
        "/Admin/CreateRole",
        { "Content-type": "application/json" },
        { role: newRole }
    )
        .then(response => {
            if (
                response.data.message === "Role Created!" &&
                response.status === 200
            ) {
                dispatch({
                    type: SUBMIT_ROLES_SUCCESS,
                    payload: { Submitting: false, formErrors: [] }
                });
            }
        })
        .catch(errors => {
            if (errors.response) {
                const responseErrors = errors.response.data["errors"];
                dispatch({
                    type: SUBMIT_ROLES_FAILURE,
                    payload: { Submitting: false, formErrors: responseErrors }
                });
            }
        });
};