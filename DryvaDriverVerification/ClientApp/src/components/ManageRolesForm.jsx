import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import httpOthers from "../services/httpService/httpOthers";

const ManageRolesForm = props => {
    const [RolesAndClaims, setRolesAndClaims] = useState([]);
    const [Errors, setErrors] = useState([]);
    const [ResponseRolesAndClaimsData, setResponseRolesAndClaimsData] = useState(
        []
    );

    useEffect(() => {
        httpOthers("get", "Admin/GetRolesAndClaims", null, null)
            .then(response => {
                if (response.status === 200) {
                    const rolesClaimsData = response.data.map((roleAndClaims, i) => {
                        let data = Object.values(roleAndClaims);

                        return {
                            id: data[0],
                            sn: i + 1,
                            role: data[1],
                            Claims: data[2].join(", ")
                        };
                    });
                    setRolesAndClaims(rolesClaimsData);
                    setResponseRolesAndClaimsData(response.data);
                }
            })
            .catch(errors => {
                if (errors.response) {
                    const responseErrors = errors.response.data["errors"];
                    setErrors(responseErrors);
                    setRolesAndClaims([]);
                }
            });

        return () => {
            setRolesAndClaims([]);
            setErrors([]);
        };
    }, []);

    const [columns, setColumns] = useState([
        { title: "S/N", field: "sn", editable: "never" },
        { title: "Role", field: "role" },
        { title: "Claims", field: "Claims", editable: "never" }
    ]);

    return (
        <div>
            <br />
            <br />
            <h2>
                <b>Manage Roles and Claims</b>
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
                data={RolesAndClaims}
                options={{
                    headerStyle: {
                        backgroundColor: "#6C6C6C",
                        color: "#FFF"
                    },
                    actionsColumnIndex: -1
                }}
                editable={{
                    onRowAdd: newRoleAndClaims =>
                        new Promise((resolve, reject) => {
                            if (newRoleAndClaims) {
                                httpOthers(
                                    "post",
                                    "/Admin/CreateRole",
                                    { "Content-type": "application/json" },
                                    { role: newRoleAndClaims.role }
                                )
                                    .then(response => {
                                        if (response.status === 200) {
                                            const message = response.data;
                                            const id = message["id"];
                                            const sn = message["sn"];
                                            const role = message["role"];

                                            setRolesAndClaims(prevState => {
                                                const RolesAndClaims = [...prevState];
                                                return [
                                                    ...RolesAndClaims,
                                                    { id: id, sn: sn, role: role, Claims: [] }
                                                ];
                                            });

                                            resolve(message["message"]);
                                            alert(message["message"]);
                                        }
                                    })
                                    .catch(errors => {
                                        if (errors.response) {
                                            const responseErrors = errors.response.data;
                                            reject(responseErrors["errors"]);
                                            alert(responseErrors["errors"]);
                                        }
                                    });
                            }
                        }),
                    onRowUpdate: (newRoleAndClaims, oldRoleAndClaims) =>
                        new Promise((resolve, reject) => {
                            if (oldRoleAndClaims) {
                                setRolesAndClaims(prevState => {
                                    const RolesAndClaims = [...prevState];
                                    const index = RolesAndClaims.indexOf(oldRoleAndClaims);
                                    RolesAndClaims[index] = newRoleAndClaims;
                                    return RolesAndClaims;
                                });
                            }

                            httpOthers(
                                "put",
                                "Admin/UpdateRole",
                                {
                                    "Content-type": "application/json"
                                },
                                {
                                    id: oldRoleAndClaims.id,
                                    role: newRoleAndClaims.role
                                }
                            )
                                .then(response => {
                                    if (response.status === 200) {
                                        const message = response.data;
                                        resolve(message["message"]);
                                        alert(message["message"]);
                                    }
                                })
                                .catch(errors => {
                                    if (errors.response) {
                                        const responseErrors = errors.response.data;
                                        reject(responseErrors["errors"]);
                                        alert(responseErrors["errors"]);
                                    }
                                });
                        }),
                    onRowDelete: oldRoleAndClaims =>
                        new Promise((resolve, reject) => {
                            if (oldRoleAndClaims) {
                                setRolesAndClaims(prevState => {
                                    const RolesAndClaims = [...prevState];
                                    const index = RolesAndClaims.indexOf(oldRoleAndClaims);
                                    RolesAndClaims.splice(index, 1);
                                    return RolesAndClaims;
                                });
                            }

                            httpOthers(
                                "delete",
                                "Admin/DeleteRole",
                                {
                                    "Content-type": "application/json"
                                },
                                { id: oldRoleAndClaims.id }
                            )
                                .then(response => {
                                    if (response.status === 200) {
                                        const message = response.data;
                                        resolve(message["message"]);
                                        alert(message["message"]);
                                    }
                                })
                                .catch(errors => {
                                    if (errors.response) {
                                        const responseErrors = errors.response.data;
                                        reject(responseErrors["errors"]);
                                        alert(responseErrors["errors"]);
                                    }
                                });
                        })
                }}
            />
        </div>
    );
};

export default ManageRolesForm;