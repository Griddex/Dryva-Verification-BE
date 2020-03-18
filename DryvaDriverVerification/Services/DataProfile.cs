using AutoMapper;
using DryvaDriverVerification.Models;
using DryvaDriverVerification.ViewModels;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DryvaDriverVerification.Services
{
    public class DataProfile : Profile
    {
        public DataProfile()
        {
            CreateMap<DriverData, DriverDataViewModel>()
                .IncludeMembers(s => s.Inspector, s => s.Driver, s => s.NextOfKin,
                    s => s.Owner, s => s.Vehicle, s => s.EngineFluidLevels, s => s.ExteriorChecks,
                    s => s.InteriorChecks, s => s.SafetyTechnical, s => s.ManagedBy, s => s.RegisteredBy)
                .ForPath(d => d.UserId, opt => opt.MapFrom(s => s.UserId))
                .ReverseMap();
            CreateMap<ManagedBy, DriverDataViewModel>()
                .ForPath(d => d.ManagedByNumber, opt => opt.MapFrom(s => s.ManagedByNumber))
                .ForPath(d => d.ManagedByName, opt => opt.MapFrom(s => s.ManagedByName))
                .ReverseMap();
            CreateMap<RegisteredBy, DriverDataViewModel>()
               .ForPath(d => d.RegisteredByNumber, opt => opt.MapFrom(s => s.RegisteredByNumber))
               .ForPath(d => d.RegisteredByName, opt => opt.MapFrom(s => s.RegisteredByName))
               .ReverseMap();
            CreateMap<Inspector, DriverDataViewModel>().ReverseMap();
            CreateMap<Driver, DriverDataViewModel>()
                .IncludeMembers(s => s.DriversHomeAddress, s => s.DriversPermanentAddress, s => s.Name)
                .ForPath(d => d.DriversFirstName, opt => opt.MapFrom(s => s.Name.FirstName))
                .ForPath(d => d.DriversMiddleName, opt => opt.MapFrom(s => s.Name.MiddleName))
                .ForPath(d => d.DriversSurname, opt => opt.MapFrom(s => s.Name.LastName))
                .ForPath(d => d.DriversHomeAddressLine1, opt => opt.MapFrom(s => s.DriversHomeAddress.DriversAddressLine1))
                .ForPath(d => d.DriversHomeAddressLine2, opt => opt.MapFrom(s => s.DriversHomeAddress.DriversAddressLine2))
                .ForPath(d => d.DriversHomeCity, opt => opt.MapFrom(s => s.DriversHomeAddress.DriversCity))
                .ForPath(d => d.DriversHomeState, opt => opt.MapFrom(s => s.DriversHomeAddress.DriversState))
                .ForPath(d => d.DriversHomeCountry, opt => opt.MapFrom(s => s.DriversHomeAddress.DriversCountry))
                .ForPath(d => d.DriversHomePostalCode, opt => opt.MapFrom(s => s.DriversHomeAddress.DriversPostalCode))
                .ForPath(d => d.DriversPermanentAddressLine1, opt => opt.MapFrom(s => s.DriversPermanentAddress.DriversAddressLine1))
                .ForPath(d => d.DriversPermanentAddressLine2, opt => opt.MapFrom(s => s.DriversPermanentAddress.DriversAddressLine2))
                .ForPath(d => d.DriversPermanentCity, opt => opt.MapFrom(s => s.DriversPermanentAddress.DriversCity))
                .ForPath(d => d.DriversPermanentState, opt => opt.MapFrom(s => s.DriversPermanentAddress.DriversState))
                .ForPath(d => d.DriversPermanentCountry, opt => opt.MapFrom(s => s.DriversPermanentAddress.DriversCountry))
                .ForPath(d => d.DriversPermanentPostalCode, opt => opt.MapFrom(s => s.DriversPermanentAddress.DriversPostalCode))
                .ReverseMap();
            CreateMap<Address, DriverDataViewModel>().ReverseMap();
            CreateMap<Name, DriverDataViewModel>().ReverseMap();

            CreateMap<NextOfKin, DriverDataViewModel>().ReverseMap();
            CreateMap<Owner, DriverDataViewModel>().ReverseMap();
            CreateMap<Vehicle, DriverDataViewModel>().ReverseMap();
            CreateMap<EngineFluidLevels, DriverDataViewModel>().ReverseMap();
            CreateMap<ExteriorChecks, DriverDataViewModel>().ReverseMap();
            CreateMap<InteriorChecks, DriverDataViewModel>().ReverseMap();
            CreateMap<SafetyTechnical, DriverDataViewModel>().ReverseMap();
            CreateMap<List<Image>, DriverDataViewModel>().ReverseMap();
            CreateMap<Image, IFormFile>()
                .ForMember(d => d.FileName, opt => opt.MapFrom(s => s.FileName))
                .ForMember(d => d.Length, opt => opt.MapFrom(s => s.Length))
                .ReverseMap();
        }
    }
}