using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace DryvaDriverVerification.ViewModels
{
    public class DriverDataViewModel
    {
        public string UserId { get; set; }
        public string DriverDataId { get; set; }
        public string ManagedByNumber { get; set; }
        public string ManagedByName { get; set; }
        public string RegisteredByNumber { get; set; }
        public string RegisteredByName { get; set; }
        public string NameOfInspector { get; set; }
        public string NameOfSupervisor { get; set; }
        public string PlaceOfInspection { get; set; }
        public DateTime DateOfInspection { get; set; }
        public string VehiclePlateNumber { get; set; }
        public string InspectionPassed { get; set; }
        public string InspectorsGeneralRemarks { get; set; }

        public string DriversFirstName { get; set; }
        public string DriversMiddleName { get; set; }
        public string DriversSurname { get; set; }
        public string DriversMobile { get; set; }
        public string DriversEmail { get; set; }
        public string DriversLicenseNo { get; set; }
        public DateTime DriversLicenseExpiryDate { get; set; }
        public string DriversHomeAddressLine1 { get; set; }
        public string DriversHomeAddressLine2 { get; set; }
        public string DriversHomePostalCode { get; set; }
        public string DriversHomeCountry { get; set; }
        public string DriversHomeState { get; set; }
        public string DriversHomeCity { get; set; }
        public string DriversPermanentAddressLine1 { get; set; }
        public string DriversPermanentAddressLine2 { get; set; }
        public string DriversPermanentPostalCode { get; set; }
        public string DriversPermanentCountry { get; set; }
        public string DriversPermanentState { get; set; }
        public string DriversPermanentCity { get; set; }

        public string NextOfKinFirstName { get; set; }
        public string NextOfKinMiddleName { get; set; }
        public string NextOfKinLastName { get; set; }
        public string NextOfKinPhoneNumber { get; set; }
        public string NextOfKinHomeAddressLine1 { get; set; }
        public string NextOfKinHomeAddressLine2 { get; set; }
        public string NextOfKinHomePostalCode { get; set; }
        public string NextOfKinHomeCountry { get; set; }
        public string NextOfKinHomeState { get; set; }
        public string NextOfKinHomeCity { get; set; }

        public string NameOfOwner { get; set; }
        public string OwnersHouseAddress { get; set; }
        public string OwnersMobileNo { get; set; }
        public string OwnersNextOfKinName { get; set; }

        public string VehicleType { get; set; }
        public string VehicleMake { get; set; }
        public string VehicleModel { get; set; }
        public string YearOfManufacture { get; set; }
        public string ChassisNo { get; set; }
        public string EngineNo { get; set; }
        public DateTime MOTExpiry { get; set; }
        public DateTime InsuranceExpiry { get; set; }

        public bool FuelGaugeWorking { get; set; }
        public bool OilLevelPressureGaugeWorking { get; set; }
        public bool TransmissionFluidLevel { get; set; }
        public bool PowerSteeringFluidLevel { get; set; }
        public bool BrakeFluidLevel { get; set; }
        public bool BatteryCharge { get; set; }
        public bool WindshieldWiperFluid { get; set; }
        public bool RadiatorFluidLevel { get; set; }
        public bool FluidsLeakingUnderBus { get; set; }
        public bool EngineWarningLights { get; set; }
        public string OtherEngineFluidLevels { get; set; }

        public bool HeadlightsHiLow { get; set; }
        public bool FoglampsHazardlamps { get; set; }
        public bool WindshieldCondition { get; set; }
        public bool DirectionalSignalsFrontrear { get; set; }
        public bool TaillightsRunninglights { get; set; }
        public bool BrakelightsBackUpLights { get; set; }
        public bool TireconditionAirpressure { get; set; }
        public bool LugnutsTight { get; set; }
        public bool WindowscanWindfreely { get; set; }
        public bool LuggageStoragedoorsEnginecompartmentPanels { get; set; }
        public bool ExteriorClean { get; set; }
        public bool BodyconditionScratchesDingsDents { get; set; }
        public string OtherExteriorChecks { get; set; }

        public bool Mirrors { get; set; }
        public bool WindshieldWipers { get; set; }
        public bool Horn { get; set; }
        public bool ParkingBrake { get; set; }
        public bool Fans { get; set; }
        public bool AirConditioning { get; set; }
        public bool RadioEquipmentCellphone { get; set; }
        public bool CantheDoorsbeOpenedFreely { get; set; }
        public bool InteriorLights { get; set; }
        public bool DriverSeatBelts { get; set; }
        public bool PassengerSeats { get; set; }
        public bool FireExtinguisher { get; set; }
        public bool OtherEmergencyGear { get; set; }
        public bool DestinationSignbox { get; set; }
        public bool WindowsCleanandcanWindFreely { get; set; }
        public bool InteriorClean { get; set; }
        public bool WastebinAvailableOrEmptied { get; set; }
        public string OtherInteriorChecks { get; set; }

        public int NoOfDefectsOnBus { get; set; }
        public string HasSupervisorBeenNotified { get; set; }
        public string SafetyTechnicalGeneralRemarks { get; set; }

        [FromForm(Name = "Images")]
        public List<IFormFile> Images { get; set; }
    }
}