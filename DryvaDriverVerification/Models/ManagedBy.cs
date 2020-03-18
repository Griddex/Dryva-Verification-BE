using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class ManagedBy
    {
        public int ManagedById { get; set; }

        [Required]
        public string ManagedByNumber { get; set; }

        [Required]
        public string ManagedByName { get; set; }
    }
}