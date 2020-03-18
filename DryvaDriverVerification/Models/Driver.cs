using System;
using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class Driver
    {
        public int DriverId { get; set; }
        public int NameFK { get; set; }
        public Name Name { get; set; }

        [Required]
        public string DriversMobile { get; set; }

        [Required]
        public string DriversEmail { get; set; }

        [Required]
        public string DriversLicenseNo { get; set; }

        [Required]
        public DateTime DriversLicenseExpiryDate { get; set; }

        public int DriversHomeAddressFK { get; set; }
        public Address DriversHomeAddress { get; set; }
        public int DriversPermanentAddressFK { get; set; }
        public Address DriversPermanentAddress { get; set; }
    }
}