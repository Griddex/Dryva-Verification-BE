using System;
using System.Collections.Generic;

namespace DryvaDriverVerification.ViewModels
{
    public class RolesViewModel
    {
        public Guid Id { get; set; }
        public string Role { get; set; }
        public List<string> Permissions { get; set; }
    }
}