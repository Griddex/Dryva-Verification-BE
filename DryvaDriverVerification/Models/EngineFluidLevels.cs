namespace DryvaDriverVerification.Models
{
    public class EngineFluidLevels
    {
        public int EngineFluidLevelsId { get; set; }
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
    }
}