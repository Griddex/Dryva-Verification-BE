import {
    SUBMIT_ROLES_COMMENCE,
    SUBMIT_ROLES_SUCCESS,
    SUBMIT_ROLES_FAILURE,
    LOAD_ROLES_COMMENCE,
    LOAD_ROLES_SUCCESS,
    LOAD_ROLES_FAILURE
} from "./../actions/rolesAction";
import { SEND_LOGIN_TO_STORE } from "./../actions/sendLoginToStoreAction";
import UserState from "./../store/userStore";

export const rolesReducer = (state = UserState, action) => {
    switch (action.type) {
        case SEND_LOGIN_TO_STORE:
            return {
                ...state,
                [action.name]: action.value
            };
        case SUBMIT_ROLES_COMMENCE:
            return {
                ...state,
                Submitting: action.payload.Submitting,
                formErrors: new Array(action.payload.formErrors)
            };
        case SUBMIT_ROLES_SUCCESS:
            return {
                ...state,
                Submitting: action.payload.Submitting
            };
        case SUBMIT_ROLES_FAILURE:
            return {
                ...state,
                formErrors: new Array(action.payload.formErrors),
                Submitting: action.payload.Submitting
            };
        case LOAD_ROLES_COMMENCE:
            return {
                ...state,
                roles: action.payload.roles,
                Loading: action.payload.Loading,
                formErrors: new Array(action.payload.formErrors)
            };
        case LOAD_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.payload.roles,
                Loading: action.payload.Loading,
                formErrors: new Array(action.payload.formErrors)
            };
        case LOAD_ROLES_FAILURE:
            return {
                ...state,
                roles: action.payload.roles,
                formErrors: new Array(action.payload.formErrors),
                Loading: action.payload.Loading
            };
        default:
            return { ...state };
    }
};