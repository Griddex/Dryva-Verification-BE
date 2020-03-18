namespace DryvaDriverVerification.Models
{
    public class ExteriorChecks
    {
        public int ExteriorChecksId { get; set; }
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
    }
}