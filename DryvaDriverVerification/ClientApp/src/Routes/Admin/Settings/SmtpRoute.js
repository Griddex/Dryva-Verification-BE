import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { updateEmailSettingsAction } from "./../../../actions/emailSettingsAction";
import httpOthers from "./../../../services/httpService/httpOthers";
import Input from "./../../../components/common/Input";
import Select from "./../../../components/common/Select";
import Button from "@material-ui/core/Button";

const SmtpRoute = () => {
    const useStyles = makeStyles(theme => ({
        "@global": { body: { backgroundColor: "#FFF" } },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(5)
        },
        error: { color: "red" }
    }));

    const [emailSettingsData, setemailSettingsData] = useState({
        from: "",
        smtpServer: "",
        port: 0,
        userName: "",
        password: "",
        enableSSL: "false"
    });
    const [errors, setErrors] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        httpOthers("get", "Admin/GetEmailSettings", null, null)
            .then(response => {
                if (response.status === 200) {
                    setemailSettingsData(response.data);
                    const message = response.data;
                }
            })
            .catch(errors => {
                if (errors.response) {
                    const responseErrors = errors.response.data["errors"];
                    if (responseErrors !== undefined) {
                        setErrors(responseErrors);
                        alert(responseErrors["errors"]);
                    }
                }
            });
    }, []);

    const {
        from,
        smtpServer,
        port,
        userName,
        password,
        enableSSL
    } = emailSettingsData;

    if (enableSSL === undefined) enableSSL = false;

    return (
        <div>
            <div>
                {errors &&
                    errors.map((e, i) => {
                        return (
                            <p key={i} className={classes.error}>
                                {e}
                            </p>
                        );
                    })}
            </div>
            <Formik
                initialValues={emailSettingsData}
                validationSchema={Yup.object().shape({
                    from: Yup.string().required("Email sender is required"),
                    smtpServer: Yup.string().required("Email SMTP Server is required"),
                    port: Yup.number().required("Port number is required"),
                    userName: Yup.string().required("Email account userName is required"),
                    password: Yup.string().required("Email account password is required")
                })}
                validateOnBlur
                onSubmit={(
                    { from, smtpServer, port, userName, password, enableSSL },
                    formikBag
                ) => {
                    const { SetSubmitting } = formikBag;
                    updateEmailSettingsAction(
                        from,
                        smtpServer,
                        port,
                        userName,
                        password,
                        enableSSL,
                        SetSubmitting
                    );
                }}
            >
                {formikProps => {
                    const {
                        errors,
                        touched,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isValid,
                        status,
                        isSubmitting,
                        setValues
                    } = formikProps;

                    return (
                        <form onSubmit={handleSubmit}>
                            <br />
                            <br />
                            <h2>
                                <b>Configure SMTP Email Server</b>
                            </h2>
                            <hr />
                            {Input(
                                "smtpServer",
                                "SMTP Email Server",
                                smtpServer,
                                400,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                null,
                                null,
                                null,
                                setemailSettingsData,
                                emailSettingsData,
                                setValues
                            )}
                            <br />
                            {Input(
                                "port",
                                "Port Number",
                                port,
                                150,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                null,
                                null,
                                null,
                                setemailSettingsData,
                                emailSettingsData,
                                setValues
                            )}
                            <br />
                            {Input(
                                "from",
                                "Sender's Email",
                                from,
                                400,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                null,
                                null,
                                null,
                                setemailSettingsData,
                                emailSettingsData,
                                setValues
                            )}
                            <br />
                            {Input(
                                "userName",
                                "Email UserName",
                                userName,
                                400,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                null,
                                null,
                                null,
                                setemailSettingsData,
                                emailSettingsData,
                                setValues
                            )}
                            <br />
                            {Input(
                                "password",
                                "Email Password",
                                password,
                                400,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                null,
                                null,
                                null,
                                setemailSettingsData,
                                emailSettingsData,
                                setValues
                            )}
                            <br />
                            {Select(
                                "enableSSL",
                                "Enable SSL",
                                enableSSL,
                                ["true", "false"],
                                100,
                                errors,
                                handleChange,
                                handleBlur,
                                null,
                                setemailSettingsData,
                                emailSettingsData,
                                setValues
                            )}
                            <br />
                            <br />
                            {isSubmitting && (
                                <img
                                    alt="Loading..."
                                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                                />
                            )}
                            <Button
                                type="submit"
                                width={400}
                                variant="contained"
                                color="primary"
                                disabled={
                                    Object.values(touched).every(v => v === false) ||
                                    !isValid ||
                                    isSubmitting
                                }
                            >
                                Update
              </Button>
                            {status && <div className={"alert alert-danger"}>{status}</div>}
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default SmtpRoute;