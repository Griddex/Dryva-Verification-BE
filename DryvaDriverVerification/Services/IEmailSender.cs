using System.Threading.Tasks;

namespace DryvaDriverVerification.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string From, string To, string Subject, string Body, string SmtpServer,
            int Port, bool EnableSSL, string UserName, string Password);
    }
}