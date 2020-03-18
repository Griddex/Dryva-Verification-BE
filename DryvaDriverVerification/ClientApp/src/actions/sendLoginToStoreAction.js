export const SEND_LOGIN_TO_STORE = "SEND_LOGIN_TO_STORE";

export const sendLoginToStoreAction = (name, value) => dispatch => {
    dispatch({
        type: SEND_LOGIN_TO_STORE,
        name: name,
        value: value
    });
};