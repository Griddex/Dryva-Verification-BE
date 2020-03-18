using AutoMapper;
using DryvaDriverVerification.Models;
using DryvaDriverVerification.ViewModels;

namespace DryvaDriverVerification.Services
{
    public class RegistrationProfile : Profile
    {
        public RegistrationProfile()
        {
            CreateMap<Name, Name>();
            CreateMap<RegisterViewModel, ApplicationUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.MobileNumber))
                .ForPath(dest => dest.Name.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForPath(dest => dest.Name.MiddleName, opt => opt.MapFrom(src => src.MiddleName))
                .ForPath(dest => dest.Name.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForPath(dest => dest.Name.NickName, opt => opt.MapFrom(src => src.NickName));
        }
    }
}