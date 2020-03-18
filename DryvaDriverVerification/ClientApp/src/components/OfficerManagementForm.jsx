import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import httpOthers from "../services/httpService/httpOthers";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import * as _ from "lodash";

const OfficerManagementForm = props => {
    const [Officers, setOfficers] = useState([]);
    const [Errors, setErrors] = useState([]);

    let officersDataSorted;
    let officersData;

    useEffect(() => {
        httpOthers("get", "Admin/GetAllOfficers", null, null)
            .then(response => {
                if (response.status === 200) {
                    officersDataSorted = _.sortBy(response.data, "role");

                    officersData = officersDataSorted.map((officerInfo, i) => {
                        const officerInfoValues = Object.values(officerInfo);
                        return {
                            id: officerInfoValues[0],
                            sn: i + 1,
                            firstName: officerInfoValues[1],
                            lastName: officerInfoValues[2],
                            role: officerInfoValues[3],
                            loginStatus:
                                officerInfoValues[4] === true ? (
                                    <Brightness1Icon htmlColor="green" fontSize="small" />
                                ) : (
                                        <Brightness1Icon htmlColor="red" fontSize="small" />
                                    )
                        };
                    });
                    setOfficers(officersData);
                }
            })
            .catch(errors => {
                if (errors.response) {
                    const responseErrors = errors.response.data["errors"];
                    setErrors(responseErrors);
                    setOfficers([]);
                }
            });

        return () => {
            setOfficers([]);
            setErrors([]);
        };
    }, []);

    const [columns, setColumns] = useState([
        { title: "S/N", field: "sn" },
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
        { title: "Role", field: "role" },
        { title: "Login Status", field: "loginStatus" }
    ]);

    return (
        <div>
            <br />
            <br />
            <h2>
                <b>Officers Management</b>
            </h2>
            <hr />
            {Errors &&
                Errors.map((e, i) => {
                    return (
                        <p key={i} style={{ color: "red" }}>
                            {e}
                        </p>
                    );
                })}

            <MaterialTable
                title=""
                columns={columns}
                data={Officers}
                options={{
                    headerStyle: {
                        backgroundColor: "#6C6C6C",
                        color: "#FFF"
                    },
                    actionsColumnIndex: -1,
                    exportButton: true
                }}
                actions={[
                    {
                        icon: "rotate_left",
                        tooltip: "Reset Password",
                        onClick: (event, rowData) => {
                            const result = window.confirm(
                                `Do you want to reset the password for ${rowData.firstName} ${rowData.lastName}?`
                            );
                            if (!result) return;

                            const userId = rowData.id;
                            httpOthers(
                                "post",
                                "Admin/ResetPassword",
                                {
                                    "Content-type": "application/json"
                                },
                                { userId: userId }
                            )
                                .then(response => {
                                    if (response.status === 200) {
                                        const message = response.data;
                                        alert(message["message"]);
                                    }
                                })
                                .catch(errors => {
                                    if (errors.response) {
                                        const responseErrors = errors.response.data;
                                        alert(responseErrors["errors"]);
                                    }
                                });
                        }
                    },
                    {
                        icon: "delete_outline",
                        tooltip: "Delete Officer",
                        onClick: (event, rowData) => {
                            const result = window.confirm(
                                `Do you want to delete verification officer ${rowData.firstName} ${rowData.lastName}?`
                            );
                            if (!result) return;

                            if (rowData) {
                                setOfficers(prevState => {
                                    const Officers = [...prevState];
                                    const index = Officers.indexOf(rowData);
                                    Officers.splice(index, 1);
                                    return Officers;
                                });
                            }
                            const userId = rowData.id;
                            httpOthers(
                                "delete",
                                "Admin/DeleteOfficer",
                                {
                                    "Content-type": "application/json"
                                },
                                { Id: userId }
                            )
                                .then(response => {
                                    const message = response.data;
                                    alert(message["message"]);
                                })
                                .catch(errors => {
                                    if (errors.response) {
                                        const responseErrors = errors.response.data;
                                        alert(responseErrors["errors"]);
                                    }
                                });
                        }
                    }
                ]}
            />
        </div>
    );
};

export default OfficerManagementForm;