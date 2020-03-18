import React from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./../../components/LoginForm";
import { Formik } from "formik";
import * as Yup from "yup";
import { sendValuesToStoreAction } from "./../../actions/sendValuesToStoreAction";
import { sendLoginToStoreAction } from "./../../actions/sendLoginToStoreAction";
import { loginUserAction } from "./../../actions/userAction";
import { connect } from "react-redux";

function LoginRoute(props) {
    const useStyles = makeStyles(theme => ({
        "@global": { body: { backgroundColor: "#FFF" } },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(5)
        },
        error: { color: "red" }
    }));

    const { formErrors, loginUser } = props;
    const classes = useStyles();

    return (
        <div>
            <Logo />
            <div>
                {formErrors &&
                    formErrors.map((e, i) => {
                        return (
                            <p key={i} className={classes.error}>
                                {e}
                            </p>
                        );
                    })}
            </div>
            <div>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required("Email is required"),
                        password: Yup.string().required("Password is required")
                    })}
                    onSubmit={(values, formikBag) => {
                        const { rememberMe } = props;
                        const { email, password } = values;
                        loginUser(email, password, rememberMe);
                    }}
                >
                    {formikProps => <LoginForm {...formikProps} {...props} />}
                </Formik>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        rememberMe: state.userReducer.rememberMe,
        formErrors: state.userReducer.formErrors,
        loginSubmitting: state.userReducer.Submitting
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveFormValuesInStore: (name, value) =>
            dispatch(sendValuesToStoreAction(name, value)),
        saveLoginValuesInStore: (name, value) =>
            dispatch(sendLoginToStoreAction(name, value)),
        loginUser: (email, password, rememberMe) =>
            dispatch(loginUserAction(email, password, rememberMe))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRoute);