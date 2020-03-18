using Microsoft.AspNetCore.Identity;
using System;

namespace DryvaDriverVerification.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public int NameFK { get; set; }
        public Name Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; } = DateTime.Now;
    }
}