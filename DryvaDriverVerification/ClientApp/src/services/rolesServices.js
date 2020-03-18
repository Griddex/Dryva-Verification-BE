import httpOthers from "./httpService/httpOthers";

export const GetRoles = () => {
    let rolesData = [];

    httpOthers("get", "Admin/GetAllRoles", null, null)
        .then(response => {
            if (response.status === 200) {
                rolesData = response.data;
            }
        })
        .catch(errors => {
            if (errors.response) {
                const responseErrors = errors.response.data["errors"];
            }
        });

    return rolesData;
};

//Edit Role
//Delete