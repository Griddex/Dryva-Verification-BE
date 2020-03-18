using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class SafetyTechnical
    {
        public int SafetyTechnicalId { get; set; }

        [Required]
        public int NoOfDefectsOnBus { get; set; }

        [Required]
        public string HasSupervisorBeenNotified { get; set; }

        [Required]
        public string SafetyTechnicalGeneralRemarks { get; set; }
    }
}