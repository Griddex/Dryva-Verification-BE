import React from "react";
import Button from "@material-ui/core/Button";
import Input from "./common/Input";
import CheckBox from "./common/CheckBox";

function LoginForm(props) {
    const {
        values: { email, password },
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        isValid,
        status,
        rememberMe,
        loginSubmitting,
        saveFormValuesInStore,
        saveLoginValuesInStore
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            {Input(
                "email",
                "Email",
                email,
                400,
                errors,
                touched,
                handleChange,
                handleBlur,
                saveFormValuesInStore,
                null,
                saveLoginValuesInStore
            )}
            {Input(
                "password",
                "Password",
                password,
                400,
                errors,
                touched,
                handleChange,
                handleBlur,
                saveFormValuesInStore,
                "password",
                saveLoginValuesInStore
            )}
            {loginSubmitting && (
                <img
                    alt={"Loading..."}
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
            )}
            <CheckBox
                name="rememberMe"
                label="Remember me"
                checked={rememberMe}
                saveFormValuesInStore={saveFormValuesInStore}
                saveLoginValuesInStore={saveLoginValuesInStore}
            />
            <Button
                type="submit"
                width={400}
                variant="contained"
                color="primary"
                disabled={!isValid || loginSubmitting}
            >
                Login
      </Button>
            {status && <div className={"alert alert-danger"}>{status}</div>}
        </form>
    );
}

export default LoginForm;