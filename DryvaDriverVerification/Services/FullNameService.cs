using DryvaDriverVerification.Models;

namespace DryvaDriverVerification.Services
{
    public static class FullNameService
    {
        public static string GetFullName(Name name)
        {
            if (name.MiddleName != null)
                return $"{name.FirstName} {name.MiddleName} {name.LastName}";
            return $"{name.FirstName} {name.LastName}";
        }
    }
}