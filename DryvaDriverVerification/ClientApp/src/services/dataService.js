import * as _ from "lodash";
import { dateTransformationService } from "./dateTransformationService";
import uuid from "uuid/v4";
import authService from "./authService";

const dataService = storeValues => {
    const UserId = authService("identity").sid;

    let formData = new FormData();
    let SubmitData = { UserId, ...storeValues };

    const filteredSubmitData = _.pickBy(
        SubmitData,
        (value, key) => !["Errors", "Submitting", "Result"].includes(key)
    );

    const filteredSubmitDataWithTrfmdDates = _.transform(
        filteredSubmitData,
        (r, v, k) => {
            if (
                [
                    "DateOfInspection",
                    "DriversLicenseExpiryDate",
                    "MOTExpiry",
                    "InsuranceExpiry"
                ].includes(k)
            ) {
                r[k] = dateTransformationService(v);
            } else {
                r[k] = v;
            }
        }
    );

    for (const key in filteredSubmitDataWithTrfmdDates) {
        if (key === "Images") {
            const Images = filteredSubmitDataWithTrfmdDates[key];
            for (const image of Images) {
                formData.append("Images", image, image.name);
            }
        } else if (key === "DriverDataId") {
            formData.append(key, uuid());
        } else {
            formData.append(key, filteredSubmitDataWithTrfmdDates[key]);
        }
    }

    return formData;
};

export default dataService;