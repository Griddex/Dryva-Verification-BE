using AutoMapper;
using DryvaDriverVerification.Database;
using DryvaDriverVerification.Models;
using DryvaDriverVerification.Services;
using DryvaDriverVerification.Utilities;
using DryvaDriverVerification.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Claims;

//using Newtonsoft.Json;
using System.Text.Json;
using System.Threading.Tasks;

namespace DryvaDriverVerification.Controllers
{
    [Authorize(Policy = "AdminOnly")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IEmailSender _emailSender;
        private readonly IOptionsSnapshot<EmailConfig> _emailOptions;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;
        private ApplicationUser user;

        public AdminController(RoleManager<IdentityRole<Guid>> roleManager,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDbContext applicationDbContext,
            IEmailSender emailSender,
            IOptionsSnapshot<EmailConfig> emailOptions, IMapper mapper,
            IConfiguration configuration,
            IHostingEnvironment env)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;
            _applicationDbContext = applicationDbContext;
            _emailSender = emailSender;
            _emailOptions = emailOptions;
            _mapper = mapper;
            _configuration = configuration;
            _env = env;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid && registerViewModel != null)
            {
                user = _mapper.Map<ApplicationUser>(registerViewModel);
                var resultUser = await _userManager.CreateAsync(user, registerViewModel.Password)
                    .ConfigureAwait(false);

                if (resultUser.Succeeded)
                {
                    var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user)
                        .ConfigureAwait(false);

                    var emailTokenEncoded = Uri.EscapeDataString(emailToken);
                    var emailConfirmationLink = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/Admin/ConfirmEmail?emailToken={emailTokenEncoded}&Id={user.Id}";
                    var emailConfirmationHTMLPath = Path.Combine(_env.ContentRootPath, "Templates/EmailConfirmation.html");
                    var emailConfirmationHTML = System.IO.File.ReadAllText(emailConfirmationHTMLPath);
                    var emailConfirmationHTMLString = emailConfirmationHTML.Replace("GG2352%E^%sshlbdy**(^(6", emailConfirmationLink,
                        false, CultureInfo.InvariantCulture);

                    await _emailSender.SendEmailAsync(_emailOptions.Value.From, user.Email, "Confirm your email address", emailConfirmationHTMLString,
                       _emailOptions.Value.SmtpServer, _emailOptions.Value.Port, _emailOptions.Value.EnableSSL, _emailOptions.Value.UserName,
                       _emailOptions.Value.Password).ConfigureAwait(false);

                    var roleName = registerViewModel?.Role;
                    if (!await _roleManager.RoleExistsAsync(registerViewModel.Role).ConfigureAwait(false))
                    {
                        await _roleManager.CreateAsync(new IdentityRole<Guid>(roleName))
                            .ConfigureAwait(false);
                    }
                    await _userManager.AddToRoleAsync(user, roleName).ConfigureAwait(false);

                    return Ok(new
                    {
                        Message = "Registration Succeeded!"
                    });
                }
                foreach (var error in resultUser.Errors)
                {
                    ModelState.AddModelError("Errors", error.Description);
                }
            }
            return BadRequest(ModelState);
        }

        [AllowAnonymous]
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromQuery]string emailToken, [FromQuery]string Id)
        {
            if (string.IsNullOrWhiteSpace(emailToken) || string.IsNullOrWhiteSpace(Id))
            {
                return NotFound(new { Errors = "Something went wrong please try again..." });
            }

            var user = await _userManager.FindByIdAsync(Id).ConfigureAwait(false);

            if (user == null)
            {
                return BadRequest(new { Errors = "Something went wrong during email confirmation, please try again" });
            }

            var result = await _userManager.ConfirmEmailAsync(user, emailToken).ConfigureAwait(false);

            if (result.Succeeded)
            {
                var passwordToken = await _userManager.GeneratePasswordResetTokenAsync(user)
                       .ConfigureAwait(false);
                var currentPassword = RandomPassword.Generate(8, 10);
                var resultPassword = await _userManager.ResetPasswordAsync(user, passwordToken, currentPassword)
                    .ConfigureAwait(false);

                if (resultPassword.Succeeded)
                {
                    var passwordTokenEncoded = Uri.EscapeDataString(passwordToken);
                    var passwordTokenLink = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/Admin/ChangePassword?passwordResetToken={passwordTokenEncoded}&Id={user.Id}";
                    var passwordTokenHTMLPath = Path.Combine(_env.ContentRootPath, "Templates/EmailConfirmationSuccess.html");
                    var passwordTokenHTML = System.IO.File.ReadAllText(passwordTokenHTMLPath);
                    var passwordTokenHTMLString = passwordTokenHTML.Replace("lkjsdjjGG67268354%*&", passwordTokenLink,
                        false, CultureInfo.InvariantCulture);
                    var passwordTokenHTMLStringFinal = passwordTokenHTMLString.Replace("vbcVUYWSDKY87382^^&#@", currentPassword,
                        false, CultureInfo.InvariantCulture);

                    await _emailSender.SendEmailAsync(_emailOptions.Value.From, user.Email, "Reset your password", passwordTokenHTMLStringFinal,
                        _emailOptions.Value.SmtpServer, _emailOptions.Value.Port, _emailOptions.Value.EnableSSL, _emailOptions.Value.UserName,
                        _emailOptions.Value.Password).ConfigureAwait(false);

                    return Redirect($"{_configuration["AppUrl"]}/EmailConfirmationSuccess.html");
                }
                else
                {
                    return Redirect($"{_configuration["AppUrl"]}/EmailConfirmationFailure.html");
                }
            }
            else
            {
                return Redirect($"{_configuration["AppUrl"]}/EmailConfirmationFailure.html");
            }
        }

        [AllowAnonymous]
        [HttpGet("ChangePassword")]
        public IActionResult ChangePassword([FromQuery]string passwordResetToken, [FromQuery]string Id)
        {
            if (string.IsNullOrWhiteSpace(passwordResetToken) || string.IsNullOrWhiteSpace(Id))
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                var changePasswordModel = new ChangePassword();
                changePasswordModel.UserId = Id;
                changePasswordModel.PasswordToken = passwordResetToken;

                return View(changePasswordModel);
            }
            return BadRequest(new { Errors = "Something went wrong, please try again..." });
        }

        [AllowAnonymous]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromForm] ChangePassword changePassword)
        {
            if (ModelState.IsValid)
            {
                var userId = changePassword?.UserId;
                var CurrentPassword = changePassword?.CurrentPassword;
                var NewPassword = changePassword?.NewPassword;
                var user = await _userManager.FindByIdAsync(userId).ConfigureAwait(false);

                if (user != null)
                {
                    var result = await _userManager.ChangePasswordAsync(user, CurrentPassword, NewPassword)
                     .ConfigureAwait(false);

                    if (result.Succeeded)
                    {
                        await _userManager.ResetAccessFailedCountAsync(user).ConfigureAwait(false);

                        var LoginLink = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/Login";
                        var passwordResetHTMLPath = Path.Combine(_env.ContentRootPath, "Templates/PasswordResetSuccess.html");
                        var passwordResetHTML = System.IO.File.ReadAllText(passwordResetHTMLPath);
                        var passwordResetHTMLString = passwordResetHTML.Replace("lkjsdjjGG67268354%*&", LoginLink,
                            false, CultureInfo.InvariantCulture);

                        await _emailSender.SendEmailAsync(_emailOptions.Value.From, user.Email, "Password Reset Success!", passwordResetHTMLString,
                        _emailOptions.Value.SmtpServer, _emailOptions.Value.Port, _emailOptions.Value.EnableSSL, _emailOptions.Value.UserName,
                        _emailOptions.Value.Password).ConfigureAwait(false);

                        return Redirect($"{_configuration["AppUrl"]}/PasswordResetSuccess.html");
                    }
                }
                return BadRequest(new { Errors = $"{user.UserName} does not exist" });
            }
            return BadRequest(new { Errors = $"Password reset failed" });
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel resetPasswordViewModel)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(resetPasswordViewModel?.UserId)
                    .ConfigureAwait(false);
                if (user != null)
                {
                    var passwordToken = await _userManager.GeneratePasswordResetTokenAsync(user)
                        .ConfigureAwait(false);

                    var currentPassword = RandomPassword.Generate(8, 10);
                    var result = await _userManager.ResetPasswordAsync(user, passwordToken, currentPassword)
                        .ConfigureAwait(false);

                    if (result.Succeeded)
                    {
                        var passwordTokenEncoded = Uri.EscapeDataString(passwordToken);
                        var passwordTokenLink = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/api/Admin/ChangePassword?passwordResetToken={passwordTokenEncoded}&Id={user.Id}";
                        var passwordTokenHTMLPath = Path.Combine(_env.ContentRootPath, "Templates/PasswordReset.html");
                        var passwordTokenHTML = System.IO.File.ReadAllText(passwordTokenHTMLPath);
                        var passwordTokenHTMLString = passwordTokenHTML.Replace("lkjsdjjGG67268354%*&", passwordTokenLink,
                            false, CultureInfo.InvariantCulture);
                        var passwordTokenHTMLStringFinal = passwordTokenHTMLString.Replace("vbcVUYWSDKY87382^^&#@", currentPassword,
                            false, CultureInfo.InvariantCulture);

                        await _emailSender.SendEmailAsync(_emailOptions.Value.From, user.Email, "Reset your password", passwordTokenHTMLStringFinal,
                        _emailOptions.Value.SmtpServer, _emailOptions.Value.Port, _emailOptions.Value.EnableSSL, _emailOptions.Value.UserName,
                        _emailOptions.Value.Password).ConfigureAwait(false);

                        return Ok(new { Message = $"Password reset for {user.UserName} succeeded" });
                    }
                }
                return BadRequest(new { Errors = $"{user.Name.FirstName} does not exist" });
            }
            return BadRequest(new { Errors = $"Password reset failed" });
        }

        [HttpGet("GetAllOfficers")]
        public async Task<IActionResult> GetAllOfficers()
        {
            List<object> officersData = new List<object>();
            try
            {
                var officers = await _userManager.Users
                    .Include(u => u.Name)
                    .Select(u => new { u.Id, u.Name.FirstName, u.Name.LastName })
                    .ToListAsync().ConfigureAwait(false);

                if (officers != null)
                {
                    foreach (var officer in officers)
                    {
                        var user = await _userManager.FindByIdAsync(officer.Id.ToString())
                            .ConfigureAwait(false);

                        var roles = await _userManager.GetRolesAsync(user)
                            .ConfigureAwait(false);

                        var loginStatus = _signInManager.IsSignedIn(User);
                        var userandRole = new { officer.Id, officer.FirstName, officer.LastName, role = roles[0], loginStatus };
                        officersData.Add(userandRole);
                    }
                    return Ok(officersData);
                }
                else
                {
                    return BadRequest(new { Errors = "No officers exist" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { Errors = ex.Message });
            }
        }

        [HttpGet("GetAllRoles")]
        public IActionResult GetAllRoles()
        {
            try
            {
                var roles = _roleManager.Roles.Select(role => role.Name);
                if (roles != null)
                {
                    return Ok(roles);
                }
                else
                {
                    return Ok(new { Errors = "No roles exists" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { Errors = ex.Message });
            }
        }

        [HttpGet("GetAllRoleClaims")]
        public async Task<IActionResult> GetAllRoleClaims()
        {
            List<Claim> allRoleClaims = new List<Claim>();
            var roles = _roleManager.Roles;
            foreach (var role in roles)
            {
                var roleClaimsObj = await _roleManager.GetClaimsAsync(role)
                    .ConfigureAwait(false);

                foreach (var roleClaim in roleClaimsObj)
                {
                    allRoleClaims.Add(roleClaim);
                }
            }
            var allRoleClaimsSeq = allRoleClaims.Select(rc => rc.Value).Distinct();

            return Ok(allRoleClaimsSeq);
        }

        [HttpGet("GetRolesAndClaims")]
        public async Task<IActionResult> GetRolesAndClaims()
        {
            List<object> roleAndClaims = new List<object>();
            var roles = _roleManager.Roles;
            foreach (var role in roles)
            {
                var roleClaimsObj = await _roleManager.GetClaimsAsync(role)
                    .ConfigureAwait(false);

                var roleClaimsSeq = roleClaimsObj.Select(rc => rc.Value);
                var roleClaimsStr = string.Join(",", roleClaimsSeq.ToArray());
                roleAndClaims.Add(new { id = role.Id, role = role.Name, roleClaims = roleClaimsSeq });
            }
            return Ok(roleAndClaims);
        }

        [HttpPost("AddClaimsToRole")]
        public async Task<IActionResult> AddClaimsToRole([FromBody] RolesViewModel rolesViewModel)
        {
            if (ModelState.IsValid)
            {
                var roleName = rolesViewModel?.Role;
                var permissions = rolesViewModel?.Permissions;
                if (!await _roleManager.RoleExistsAsync(roleName).ConfigureAwait(false))
                {
                    return BadRequest(new { Error = "Role doesn't exist" });
                }
                else
                {
                    var role = await _roleManager.FindByNameAsync(roleName)
                        .ConfigureAwait(false);

                    foreach (var permission in permissions)
                    {
                        var claim = new Claim("Permission", permission);
                        await _roleManager.AddClaimAsync(role, claim).ConfigureAwait(false);
                    }
                    return Ok($"All permissions added to {roleName}");
                }
            }
            return BadRequest(new { Errors = "Something happened, please try again" });
        }

        [HttpPost("CreateRole")]
        public async Task<IActionResult> CreateRole([FromBody] RolesViewModel rolesViewModel)
        {
            if (ModelState.IsValid)
            {
                var roleName = rolesViewModel?.Role;
                var result = await _roleManager.CreateAsync(new IdentityRole<Guid>(roleName))
                    .ConfigureAwait(false);

                if (result.Succeeded)
                {
                    var role = await _roleManager.FindByNameAsync(roleName).ConfigureAwait(false);
                    return Ok(new
                    {
                        Message = "Role Created!",
                        id = role.Id,
                        sn = _roleManager.Roles.Count(),
                        role = roleName
                    });
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("Errors", error.Description);
                }
                return BadRequest(ModelState);
            }
            return BadRequest(new { Errors = "Something went wrong, please try again" });
        }

        [HttpPut("UpdateRole")]
        public async Task<IActionResult> UpdateRole([FromBody] RolesViewModel rolesViewModel)
        {
            if (ModelState.IsValid)
            {
                var roleName = rolesViewModel?.Role;
                var roleId = rolesViewModel?.Id;
                if (await _roleManager.RoleExistsAsync(roleName).ConfigureAwait(false))
                {
                    return BadRequest(new { Errors = "Role already exists" });
                }
                var roleToUpdate = await _roleManager.FindByIdAsync(roleId.ToString()).ConfigureAwait(false);

                if (roleToUpdate != null)
                {
                    roleToUpdate.Name = rolesViewModel.Role;
                    var result = await _roleManager.UpdateAsync(roleToUpdate)
                        .ConfigureAwait(false);
                    if (result.Succeeded)
                    {
                        return Ok(new { Message = "Role update successful!" });
                    }
                }
                else
                {
                    return BadRequest(new { Errors = $"{roleToUpdate.Name} was not found and cannot be updated." });
                }
            }
            return BadRequest(new { Errors = "Something went wrong, please retry..." });
        }

        [HttpDelete("DeleteRole")]
        public async Task<IActionResult> DeleteRole([FromBody] RolesViewModel rolesViewModel)
        {
            if (ModelState.IsValid)
            {
                var roleId = rolesViewModel?.Id;
                var roleToDelete = await _roleManager.FindByIdAsync(roleId.ToString())
                    .ConfigureAwait(false);

                if (roleToDelete != null)
                {
                    var result = await _roleManager.DeleteAsync(roleToDelete).ConfigureAwait(false);
                    if (result.Succeeded)
                    {
                        return Ok(new { Message = "Role deleted!" });
                    }
                }
                else
                {
                    return BadRequest(new { Errors = "Role doesn't exist" });
                };
            }
            return BadRequest(new { Errors = "Something went wrong, please retry" });
        }

        [HttpDelete("DeleteOfficer")]
        public async Task<IActionResult> DeleteOfficer([FromBody] ApplicationUser applicationUser)
        {
            if (ModelState.IsValid)
            {
                var userId = applicationUser?.Id;
                var userToDelete = await _userManager.FindByIdAsync(userId.ToString())
                    .ConfigureAwait(false);

                if (userToDelete != null)
                {
                    var result = await _userManager.DeleteAsync(userToDelete).ConfigureAwait(false);
                    if (result.Succeeded)
                    {
                        return Ok(new { Message = "Officer deleted!" });
                    }
                }
                else
                {
                    return BadRequest(new { Errors = "Officer doesn't exist" });
                };
            }
            return BadRequest(new { Errors = "Something went wrong, please retry" });
        }

        [HttpDelete("DeleteDriver")]
        public async Task<IActionResult> DeleteDriver([FromBody] DriverDataViewModel driverDataViewModel)
        {
            if (ModelState.IsValid)
            {
                var driverDataId = driverDataViewModel?.DriverDataId;
                var driverToDelete = await _applicationDbContext.Data
                    .FirstOrDefaultAsync(d => d.DriverDataId.ToString() == driverDataId)
                    .ConfigureAwait(false);

                if (driverToDelete != null)
                {
                    _applicationDbContext.Data.Remove(driverToDelete);
                    var result = await _applicationDbContext.SaveChangesAsync().ConfigureAwait(false);
                    if (result > 0)
                    {
                        try
                        {
                            var imagesFolder = driverToDelete?.Images[0]?.FilePath;
                            DirectoryInfo dir = new DirectoryInfo(imagesFolder);
                            foreach (FileInfo imageFile in dir.GetFiles())
                            {
                                imageFile.Delete();
                            }
                            Directory.Delete(imagesFolder);
                        }
                        catch (Exception ex)
                        {
                            return BadRequest(new { Errors = ex.Message });
                        }
                        return Ok(new { Message = "Driver data deleted!" });
                    }
                }
                else
                {
                    return BadRequest(new { Errors = "Driver doesn't exist" });
                };
            }
            return BadRequest(new { Errors = "Something went wrong, please retry" });
        }

        [HttpGet("GetEmailSettings")]
        public IActionResult GetEmailSettings()
        {
            if (_emailOptions != null)
            {
                return Ok(_emailOptions.Value);
            }
            else
            {
                return BadRequest(new { Errors = "No SMTP Email server configured" });
            }
        }

        [HttpPost("UpdateEmailSettings")]
        public IActionResult UpdateEmailSettings([FromBody] EmailConfig emailConfig)
        {
            var optionsSer = new JsonSerializerOptions
            {
                WriteIndented = true
            };

            var optionsDeser = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            try
            {
                var filePath = Path.Combine(AppContext.BaseDirectory, "appSettings.json");
                string appSettingJson = System.IO.File.ReadAllText(filePath);
                var appSettingJsonObj = JsonSerializer.Deserialize<AppSettingsConfig>(appSettingJson, optionsDeser);

                var appSettingJsonUpd = _mapper.Map(emailConfig, appSettingJsonObj, typeof(EmailConfig),
                    typeof(AppSettingsConfig));

                string output = JsonSerializer.Serialize(appSettingJsonUpd, optionsSer);
                System.IO.File.WriteAllText(filePath, output);

                return Ok(new { Message = "Email settings update successful" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Errors = "Something went wrong, please try again" });
            }
        }
    }
}