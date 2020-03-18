namespace DryvaDriverVerification.Models
{
    public class InteriorChecks
    {
        public int InteriorChecksId { get; set; }
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
    }
}