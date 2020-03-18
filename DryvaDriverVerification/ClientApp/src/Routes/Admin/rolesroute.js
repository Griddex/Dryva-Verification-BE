import React from "react";
import { connect } from "react-redux";
import ManageRolesForm from "../../components/ManageRolesForm";

const RolesRoute = props => {
    return <ManageRolesForm {...props} />;
};

const mapStateToProps = state => {
    return {
        formErrors: state.rolesReducer.formErrors,
        Submitting: state.rolesReducer.Submitting
    };
};

export default connect(mapStateToProps, null)(RolesRoute);