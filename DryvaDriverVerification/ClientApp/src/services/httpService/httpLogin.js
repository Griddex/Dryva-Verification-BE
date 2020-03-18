import axios from "axios";
import baseURL from "../../utils/config";

const axiosLogin = axios.create({
    baseURL: baseURL,
    headers: { "Access-Control-Allow-Origin": "*" }
});
axiosLogin.interceptors.request.use(null, error => {
    alert("Something is wrong with your Login request");
    return Promise.reject(error);
});
axiosLogin.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
    }
    return Promise.reject(error);
});

const httpLogin = (method, url, data = null) => {
    return axiosLogin({
        method: method,
        url: url,
        data: data
    });
};

export default httpLogin;