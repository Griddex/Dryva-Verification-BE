using System.ComponentModel.DataAnnotations;

namespace DryvaDriverVerification.Models
{
    public class ChangePassword
    {
        [Key]
        public int ChangePasswordId { get; set; }

        public string UserId { get; set; }
        public string PasswordToken { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}