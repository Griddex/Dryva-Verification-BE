import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
    //Inspector's Form
    nameOfInspector: Yup.string().required("Inspector's name is required"),
    nameOfSupervisor: Yup.string().required("Supervisor's name is required"),
    placeOfInspection: Yup.string().required("Place of inspection is required"),
    dateOfInspection: Yup.date()
        .default(() => new Date())
        .required(),
    vehiclePlateNumber: Yup.string().required("Vehicle plate number is required"),

    //Driver's Form
    driversFirstName: Yup.string().required("Drver's first name is required"),
    driversSurname: Yup.string().required("Drver's Surname is required"),
    driversMobile: Yup.string().required(
        "Driver's mobile phone number is required"
    ),
    driversEmail: Yup.string().required("Driver's email address is required"),
    driversLicenseNo: Yup.string().required(
        "Driver's License number is required"
    ),
    driversLicenseExpiryDate: Yup.string().required(
        "Driver's license expiry date is required"
    ),
    addressLine1: Yup.string().required("Driver's address is required"),

    //Owner's Form
    nameOfOwner: Yup.string().required("Owner's name is required"),
    ownersHouseAddress: Yup.string().required(
        "Owner's house address is required"
    ),
    ownersMobileNo: Yup.string().required("Owner's mobile number is required"),
    ownersNextOfKinName: Yup.string().required(
        "Owner's next of kin name is required"
    ),

    //Vehicle Details Form
    ChassisNo: Yup.string().required("Vehicle Chassis Number is required"),
    EngineNo: Yup.string().required("Vehicle Engine Number is required")
});

export default ValidationSchema;