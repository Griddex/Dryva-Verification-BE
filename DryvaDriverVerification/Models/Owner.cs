using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class Owner
    {
        public int OwnerId { get; set; }

        [Required]
        public string NameOfOwner { get; set; }

        [Required]
        public string OwnersHouseAddress { get; set; }

        [Required]
        public string OwnersMobileNo { get; set; }

        public string OwnersNextOfKinName { get; set; }
    }
}