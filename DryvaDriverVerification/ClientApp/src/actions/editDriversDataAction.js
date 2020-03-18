export const DATA_UPDATE_STORE = "DATA_UPDATE_STORE";

export const editDriversDataAction = data => (dispatch, getState, http) => {
    dispatch({
        type: DATA_UPDATE_STORE,
        payload: { data: data, Submitting: false }
    });
};