using DryvaDriverVerification.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DryvaDriverVerification.Services
{
    public static class HttpContextExtensions
    {
        private static UserManager<ApplicationUser> userManager;
        private static SignInManager<ApplicationUser> signInManager;
        private static IServiceCollection services;

        public static Task SignInAsync(this HttpContext context, ClaimsPrincipal principal)
        {
            return Task.FromResult(0);
        }

        public static Task SignInAsync(this HttpContext context, string scheme, ClaimsPrincipal principal)
        {
            return Task.FromResult(0);
        }

        public static Task SignOutAsync(this HttpContext context, ClaimsPrincipal principal)
        {
            //using (var scope = services.BuildServiceProvider().CreateScope())
            //{
            //    signInManager = scope.ServiceProvider.GetRequiredService<SignInManager<ApplicationUser>>();
            //}
            //await signInManager.SignOutAsync().ConfigureAwait(false);
            //return;
            return Task.FromResult(0);
        }

        public static Task SignOutAsync(this HttpContext context, string scheme)
        {
            return Task.FromResult(0);
        }

        public static Task ChallengeAsync(this HttpContext context, ClaimsPrincipal principal)
        {
            return Task.FromResult(0);
        }

        public static Task ChallengeAsync(this HttpContext context, string scheme)
        {
            return Task.FromResult(0);
        }

        public static Task ForbidAsync(this HttpContext context, ClaimsPrincipal principal)
        {
            return Task.FromResult(0);
        }

        public static Task ForbidAsync(this HttpContext context, string scheme)
        {
            return Task.FromResult(0);
        }

        public static Task<AuthenticateResult> AuthenticateAsync(this HttpContext context)
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }

        public static Task<AuthenticateResult> AuthenticateAsync(this HttpContext context, string scheme)
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }
    }
}