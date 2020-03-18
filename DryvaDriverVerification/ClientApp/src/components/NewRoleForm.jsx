import React from "react";
import Input from "./common/Input";
import AlertDialog from "./common/Dialog";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import RolesState from "./../store/roleStore";

const NewRoleForm = props => {
    const useStyles = makeStyles(theme => ({
        "@global": { body: { backgroundColor: "#FFF" } },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(5)
        },
        error: { color: "red" }
    }));

    const classes = useStyles();
    const { formErrors, Submitting, registerRole } = props;
    return (
        <Formik
            initialValues={RolesState}
            validationSchema={Yup.object().shape({
                newRole: Yup.string().required("A role name is required")
            })}
            onSubmit={({ newRole }, formikBag) => {
                registerRole(newRole);
            }}
        >
            {formikProps => {
                const {
                    values: { newRole },
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    isValid
                } = formikProps;

                return (
                    <form onSubmit={handleSubmit}>
                        <h2>
                            <b>Create New Role</b>
                        </h2>
                        <hr />
                        {Input(
                            "newRole",
                            "Name of Role",
                            newRole,
                            400,
                            errors,
                            touched,
                            handleChange,
                            handleBlur
                        )}
                        {!isValid ||
                            (formErrors &&
                                formErrors.map((e, i) => {
                                    return (
                                        <p key={i} className={classes.error}>
                                            {e}
                                        </p>
                                    );
                                }))}
                        <br />
                        {Submitting && (
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        )}
                        <Button
                            type="submit"
                            width={400}
                            variant="contained"
                            color="primary"
                            disabled={!isValid || Submitting}
                        >
                            Create
            </Button>
                    </form>
                );
            }}
        </Formik>
    );
};

export default NewRoleForm;