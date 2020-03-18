using AutoMapper;
using DryvaDriverVerification.Models;

namespace DryvaDriverVerification.Services
{
    public class EmailConfigProfile : Profile
    {
        public EmailConfigProfile()
        {
            CreateMap<EmailConfig, AppSettingsConfig>()
                .ForPath(d => d.EmailConfig.EnableSSL, opt => opt.MapFrom(s => s.EnableSSL))
                .ForPath(d => d.EmailConfig.From, opt => opt.MapFrom(s => s.From))
                .ForPath(d => d.EmailConfig.Password, opt => opt.MapFrom(s => s.Password))
                .ForPath(d => d.EmailConfig.Port, opt => opt.MapFrom(s => s.Port))
                .ForPath(d => d.EmailConfig.SmtpServer, opt => opt.MapFrom(s => s.SmtpServer))
                .ForPath(d => d.EmailConfig.UserName, opt => opt.MapFrom(s => s.UserName))
                .ReverseMap();
        }
    }
}