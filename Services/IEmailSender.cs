using System.Threading.Tasks;

namespace Citizens.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
