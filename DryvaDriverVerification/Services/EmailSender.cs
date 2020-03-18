using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;

namespace DryvaDriverVerification.Services
{
    public class EmailSender : IEmailSender
    {
        public async Task SendEmailAsync(string From, string To, string Subject, string Body, string SmtpServer,
            int Port, bool EnableSSL, string UserName, string Password)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(From));
            message.To.Add(new MailboxAddress(To));
            message.Subject = Subject;
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = Body;

            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(SmtpServer, Port, EnableSSL).ConfigureAwait(false);
                await client.AuthenticateAsync(UserName, Password).ConfigureAwait(false);
                await client.SendAsync(message).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);
            }

            return;
        }
    }
}