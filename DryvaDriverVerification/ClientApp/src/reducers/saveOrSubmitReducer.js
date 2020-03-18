import { SEND_VALUES_TO_STORE } from "../actions/sendValuesToStoreAction";
import {
    FORM_SUBMISSION_REQUEST,
    FORM_SUBMISSION_SUCCESS,
    FORM_SUBMISSION_FAILURE
} from "../actions/submitAction";
import { DATA_UPDATE_STORE } from "../actions/editDriversDataAction";
import StoreInitialValues from "../store/store";

export const saveOrSubmitReducer = (state = StoreInitialValues, action) => {
    switch (action.type) {
        case SEND_VALUES_TO_STORE:
            return { ...state, [action.name]: action.value };
        case FORM_SUBMISSION_REQUEST:
            return {
                ...state,
                Submitting: action.payload.Submitting,
                result: action.payload.result,
                errors: new Array(action.payload.errors)
            };
        case FORM_SUBMISSION_SUCCESS:
            return {
                ...state,
                Submitting: action.payload.Submitting,
                result: action.payload.result,
                errors: new Array(action.payload.errors)
            };
        case FORM_SUBMISSION_FAILURE:
            return {
                ...state,
                Submitting: action.payload.Submitting,
                result: action.payload.result,
                errors: new Array(action.payload.errors)
            };
        case DATA_UPDATE_STORE:
            let stateUpdated = { ...state, ...action.payload.data };
            return {
                ...stateUpdated,
                Submitting: action.payload.Submitting,
                result: action.payload.result,
                errors: new Array(action.payload.errors)
            };
        default:
            return { ...state };
    }
};