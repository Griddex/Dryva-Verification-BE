using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class RegisteredBy
    {
        public int RegisteredById { get; set; }

        [Required]
        public string RegisteredByNumber { get; set; }

        [Required]
        public string RegisteredByName { get; set; }
    }
}