using AutoMapper;
using DryvaDriverVerification.Database;
using DryvaDriverVerification.Models;
using DryvaDriverVerification.Services;
using DryvaDriverVerification.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DryvaDriverVerification.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IOptions<VerificationImagesDirectory> _verificationImagesDirectory;
        private readonly ManagedByService _managedByService;

        public DataController(ApplicationDbContext context, IMapper mapper,
            UserManager<ApplicationUser> userManager,
            IOptions<VerificationImagesDirectory> verificationImagesDirectory,
            ManagedByService managedByService)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _verificationImagesDirectory = verificationImagesDirectory;
            _managedByService = managedByService;
        }

        [Authorize(Policy = "AdminOrOfficerOnly")]
        [HttpGet("GetDriversData")]
        public async Task<IEnumerable<DriverData>> GetDriversData()
        {
            IQueryable<DriverData> officerDriversData;

            officerDriversData = _context.Data
                .Include(d => d.Driver)
                .Include(d => d.Inspector)
                .Include(d => d.Driver)
                    .ThenInclude(e => e.Name)
                .Include(d => d.Driver)
                    .ThenInclude(e => e.DriversHomeAddress)
                .Include(d => d.Owner)
                .Include(d => d.Vehicle)
                .Include(d => d.RegisteredBy)
                .Include(d => d.ManagedBy);

            if (_managedByService.Role == "Admin")
            {
                return await officerDriversData.IgnoreQueryFilters()
                        .ToListAsync().ConfigureAwait(false);
            }

            return await officerDriversData.ToListAsync()
                    .ConfigureAwait(false);
        }

        [Authorize(Policy = "AdminOrOfficerOnly")]
        [HttpPost("PostDriversData")]
        public async Task<IActionResult> PostData([FromForm]DriverDataViewModel dataViewModel)
        {
            if (ModelState.IsValid)
            {
                var driverData = _mapper.Map<DriverDataViewModel, DriverData>(dataViewModel);

                var user = await _userManager.Users.Include(p => p.Name)
                    .FirstOrDefaultAsync(p => p.Id.ToString() == driverData.UserId)
                    .ConfigureAwait(false);

                if (user != null)
                {
                    driverData.ManagedBy.ManagedByName = FullNameService.GetFullName(user.Name);
                    driverData.ManagedBy.ManagedByNumber = dataViewModel?.UserId;
                    driverData.RegisteredBy.RegisteredByName = FullNameService.GetFullName(user.Name);
                    driverData.RegisteredBy.RegisteredByNumber = dataViewModel?.UserId;
                }
                else
                {
                    return BadRequest(new { Errors = "User not found" });
                }

                var Images = dataViewModel?.Images;
                if (Images == null)
                {
                    _context.Add(driverData);
                    var res = await _context.SaveChangesAsync().ConfigureAwait(false);
                    if (res > 0)
                    {
                        return Ok(new { Message = "Driver data saved successfully!" });
                    }
                    else
                    {
                        return BadRequest(new { Errors = "Something went wrong whilst saving the data, please try again" });
                    }
                }
                else
                {
                    try
                    {
                        _context.Add(driverData);
                        var res = await _context.SaveChangesAsync().ConfigureAwait(false);

                        //var topFolder = Environment.GetEnvironmentVariable(
                        //    RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "LocalAppData" : "Home");
                        if (res > 0)
                        {
                            var topFolder = _verificationImagesDirectory.Value.ImagesDirectory;
                            var imagesFolder = Path.Combine(topFolder, dataViewModel.DriverDataId);
                            Directory.CreateDirectory(imagesFolder);

                            var i = 0;
                            long size = Images.Sum(k => k.Length);
                            foreach (var image in Images)
                            {
                                if (image.Length > 0)
                                {
                                    var imageFileName = Path.GetRandomFileName() + ".png";
                                    var imageFilePath = Path.Combine(imagesFolder, imageFileName);
                                    using (var stream = System.IO.File.Create(imageFilePath))
                                    {
                                        await image.CopyToAsync(stream).ConfigureAwait(false);
                                    }
                                    driverData.Images[i].FileName = imageFileName;
                                    driverData.Images[i].FilePath = imageFilePath;
                                    driverData.Images[i].Length = image.Length;

                                    i = i + 1;
                                }
                            }

                            await _context.SaveChangesAsync().ConfigureAwait(false);
                            return Ok(new { Message = "Driver data saved successfully!" });
                        }
                        else
                        {
                            return BadRequest(new { Errors = "Something went wrong whilst saving the data, please try again" });
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new
                        {
                            Errors = $"Something went wrong whilst saving the data, please try again" +
                            $"{Environment.NewLine}" +
                            $"{Environment.NewLine}" +
                            $"Error: {Environment.NewLine}" +
                            $"{ex.Message}"
                        });
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("DeleteData/{dataUniqueNumber}")]
        public async Task<ActionResult<DriverData>> DeleteData(Guid dataUniqueNumber)
        {
            var data = await _context.Data.FindAsync(dataUniqueNumber)
                .ConfigureAwait(false);

            if (data == null)
            {
                return NotFound();
            }

            try
            {
                _context.Data.Remove(data);
                await _context.SaveChangesAsync().ConfigureAwait(false);

                return Ok(new { Message = "Driver's data successfully deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Errors = "Something went wrong, please try again" });
            }
        }
    }
}