export const SEND_VALUES_TO_STORE = "SEND_VALUES_TO_STORE";

export const sendValuesToStoreAction = (name, value) => dispatch => {
    dispatch({
        type: SEND_VALUES_TO_STORE,
        name: name,
        value: value
    });
};