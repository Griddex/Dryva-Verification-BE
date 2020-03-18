using System;
using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class Inspector
    {
        public int InspectorId { get; set; }

        [Required]
        public string NameOfSupervisor { get; set; }

        [Required]
        public string NameOfInspector { get; set; }

        [Required]
        public string PlaceOfInspection { get; set; }

        [Required]
        public DateTime DateOfInspection { get; set; }

        [Required]
        public string VehiclePlateNumber { get; set; }

        [Required]
        public string InspectionPassed { get; set; }

        public string InspectorsGeneralRemarks { get; set; }
    }
}