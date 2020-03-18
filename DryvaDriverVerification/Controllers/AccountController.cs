using DryvaDriverVerification.Models;
using DryvaDriverVerification.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CoreModule.Controllers
{
    [Authorize(Policy = "AdminOrOfficerOnly")]
    [ApiController]
    [Route("api/[Controller]")]
    public class AccountController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly ILogger _logger;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
           ILogger<AccountController> logger, IConfiguration configuration)
        {
            _userManager = userManager;
            _logger = logger;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel loginViewModel)
        {
            var maxLoginAttempts = 3;

            if (ModelState.IsValid)
            {
                var user = await _userManager.Users.Include(p => p.Name)
                    .FirstOrDefaultAsync(p => p.Email == loginViewModel.Email)
                    .ConfigureAwait(false);

                if (user == null)
                {
                    ModelState.AddModelError("Errors", "User does not exist.");
                    return BadRequest(ModelState);
                }

                if (!await _userManager.IsEmailConfirmedAsync(user).ConfigureAwait(false))
                {
                    ModelState.AddModelError("Errors", "Your email address is not yet confirmed");
                    return BadRequest(ModelState);
                }
                var can = !await _userManager.CheckPasswordAsync(user, loginViewModel?.Password)
                    .ConfigureAwait(false);
                if (can)
                {
                    return BadRequest(new
                    {
                        Errors = $"Invalid password and/or username"
                    });
                }

                var result = await _signInManager.PasswordSignInAsync(user,
                    loginViewModel?.Password, loginViewModel.RememberMe, lockoutOnFailure: false)
                    .ConfigureAwait(false);

                if (result.Succeeded)
                {
                    _logger.LogInformation($"{loginViewModel.Email} logged in successfully on {DateTime.Now}");

                    var role = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
                    string IsAuthenticated = (!result.IsNotAllowed).ToString(CultureInfo.InvariantCulture);

                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, user.Name.NickName),
                        new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim("Role", role[0]),
                        new Claim("IsAuthenticated", IsAuthenticated),
                    };

                    var secretKey = _configuration["Jwt:SigningKey"];
                    var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
                    double expiryInMinutes = Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"],
                        CultureInfo.InvariantCulture);

                    var securityToken = new JwtSecurityToken(
                        issuer: _configuration["Jwt:IssuerSite"],
                        audience: _configuration["Jwt:AudienceSite"],
                        expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
                        claims: claims,
                        signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha384));

                    return Ok(
                        new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(securityToken)
                        }
                    );
                }
                else
                {
                    ModelState.AddModelError("Errors", "Email or Password is incorrect");
                    if (await _userManager.GetAccessFailedCountAsync(user).ConfigureAwait(false) == maxLoginAttempts)
                    {
                        if (await _userManager.GetLockoutEnabledAsync(user).ConfigureAwait(false))
                        {
                            await _userManager.SetLockoutEnabledAsync(user, true).ConfigureAwait(false);
                        }

                        return BadRequest(new
                        {
                            Errors = "You have been locked out. Please contact your Administrator."
                        });
                    }
                    else
                    {
                        var remainingAttempts = maxLoginAttempts -
                            await _userManager.GetAccessFailedCountAsync(user).ConfigureAwait(false);

                        return BadRequest(new
                        {
                            Errors = $"You have {remainingAttempts} attempts remaining."
                        });
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync().ConfigureAwait(false);
                _logger.LogInformation("User logged out.");
                return Ok(new { Message = "Logged Out" });
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Error occurred while logging out User. Error: {ex}");
                return BadRequest(new { Errors = "Error Error occurred while logging out User." });
            }
        }
    }
}