const StoreInitialValues = {
    DriverDataId: "",

    //Inspector's Form
    NameOfInspector: "",
    NameOfSupervisor: "",
    PlaceOfInspection: "",
    DateOfInspection: new Date(),
    VehiclePlateNumber: "",
    InspectionPassed: "No",
    InspectorsGeneralRemarks: "",

    //Driver's Form
    DriversFirstName: "",
    DriversMiddleName: "",
    DriversSurname: "",
    DriversMobile: "",
    DriversEmail: "",
    DriversLicenseNo: "",
    DriversLicenseExpiryDate: new Date(),
    DriversHomeAddressLine1: "",
    DriversHomeAddressLine2: "",
    DriversHomePostalCode: "",
    DriversHomeCountry: "Nigeria",
    DriversHomeState: "Akwa Ibom",
    DriversHomeCity: "Uyo",
    DriversPermanentAddressLine1: "",
    DriversPermanentAddressLine2: "",
    DriversPermanentPostalCode: "",
    DriversPermanentCountry: "Nigeria",
    DriversPermanentState: "Akwa Ibom",
    DriversPermanentCity: "Uyo",

    //Next of Kin
    NextOfKinFirstName: "",
    NextOfKinMiddleName: "",
    NextOfKinLastName: "",
    NextOfKinPhoneNumber: "",
    NextOfKinHomeAddressLine1: "",
    NextOfKinHomeAddressLine2: "",
    NextOfKinHomePostalCode: "",
    NextOfKinHomeCountry: "Nigeria",
    NextOfKinHomeState: "Akwa Ibom",
    NextOfKinHomeCity: "Uyo",

    //Owner's Form
    NameOfOwner: "",
    OwnersHouseAddress: "",
    OwnersMobileNo: "",
    OwnersNextOfKinName: "",

    //Vehicle Details Form
    VehicleType: "",
    VehicleMake: "",
    YearOfManufacture: "",
    ChassisNo: "",
    EngineNo: "",
    MOTExpiry: new Date(),
    InsuranceExpiry: new Date(),

    //Engine Fluid Levels Form
    FuelGaugeWorking: false,
    OilLevelPressureGaugeWorking: false,
    TransmissionFluidLevel: false,
    PowerSteeringFluidLevel: false,
    BrakeFluidLevel: false,
    BatteryCharge: false,
    WindshieldWiperFluid: false,
    RadiatorFluidLevel: false,
    FluidsLeakingUnderBus: false,
    EngineWarningLights: false,
    OtherEngineFluidLevels: "",

    //Exterior Checks Form
    HeadlightsHiLow: false,
    FoglampsHazardlamps: false,
    WindshieldCondition: false,
    DirectionalSignalsFrontrear: false,
    TaillightsRunninglights: false,
    BrakelightsBackUpLights: false,
    TireconditionAirpressure: false,
    LugnutsTight: false,
    WindowscanWindfreely: false,
    LuggageStoragedoorsEnginecompartmentPanels: false,
    ExteriorClean: false,
    BodyconditionScratchesDingsDents: false,
    OtherExteriorChecks: "",

    //Interior Checks Form
    Mirrors: false,
    WindshieldWipers: false,
    Horn: false,
    ParkingBrake: false,
    Fans: false,
    AirConditioning: false,
    RadioEquipmentCellphone: false,
    CantheDoorsbeOpenedFreely: false,
    InteriorLights: false,
    DriverSeatBelts: false,
    PassengerSeats: false,
    FireExtinguisher: false,
    OtherEmergencyGear: false,
    DestinationSignbox: false,
    WindowsCleanandcanWindFreely: false,
    InteriorClean: false,
    WastebinAvailableOrEmptied: false,
    OtherInteriorChecks: "",

    //Safety Technical Summary Form
    NoOfDefectsOnBus: 0,
    HasSupervisorBeenNotified: "No",
    SafetyTechnicalGeneralRemarks: "",

    //Upload Images Form
    Images: [],

    //User login
    Errors: [],
    Submitting: false,
    Result: null
};

export default StoreInitialValues;