using System;
using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }

        [Required]
        public string VehicleType { get; set; }

        [Required]
        public string VehicleMake { get; set; }

        [Required]
        public string YearOfManufacture { get; set; }

        [Required]
        public string ChassisNo { get; set; }

        [Required]
        public string EngineNo { get; set; }

        [Required]
        public DateTime MOTExpiry { get; set; }

        [Required]
        public DateTime InsuranceExpiry { get; set; }
    }
}