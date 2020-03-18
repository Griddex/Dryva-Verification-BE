using System;
using System.Collections.Generic;

namespace DryvaDriverVerification.Models
{
    public class DriverData
    {
        public Guid DriverDataId { get; set; }
        public int InspectorFK { get; set; }
        public int DriverFK { get; set; }
        public int NextOfKinFK { get; set; }
        public int OwnerFK { get; set; }
        public int VehicleFK { get; set; }
        public int EngineFluidLevelsFK { get; set; }
        public int ExteriorChecksFK { get; set; }
        public int InteriorChecksFK { get; set; }
        public int SafetyTechnicalFK { get; set; }
        public int ImageFK { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime ModifiedOn { get; set; } = DateTime.Now;
        public ManagedBy ManagedBy { get; set; }
        public RegisteredBy RegisteredBy { get; set; }
        public Inspector Inspector { get; set; }
        public Driver Driver { get; set; }
        public NextOfKin NextOfKin { get; set; }
        public Owner Owner { get; set; }
        public Vehicle Vehicle { get; set; }
        public EngineFluidLevels EngineFluidLevels { get; set; }
        public ExteriorChecks ExteriorChecks { get; set; }
        public InteriorChecks InteriorChecks { get; set; }
        public SafetyTechnical SafetyTechnical { get; set; }
        public List<Image> Images { get; set; }
    }
}