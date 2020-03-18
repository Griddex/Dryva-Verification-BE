using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class NextOfKin
    {
        public int NextOfKinId { get; set; }

        [Required]
        public string NextOfKinFirstName { get; set; }

        public string NextOfKinMiddleName { get; set; }

        [Required]
        public string NextOfKinLastName { get; set; }

        [Required]
        public string NextOfKinPhoneNumber { get; set; }

        [Required]
        public string NextOfKinHomeAddressLine1 { get; set; }

        public string NextOfKinHomeAddressLine2 { get; set; }
        public string NextOfKinHomePostalCode { get; set; }

        [Required]
        public string NextOfKinHomeCountry { get; set; }

        [Required]
        public string NextOfKinHomeState { get; set; }

        [Required]
        public string NextOfKinHomeCity { get; set; }
    }
}