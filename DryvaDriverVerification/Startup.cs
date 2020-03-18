using AutoMapper;
using DryvaDriverVerification.Database;
using DryvaDriverVerification.Models;
using DryvaDriverVerification.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Text;

namespace DryvaDriverVerification
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddAutoMapper(typeof(RegistrationProfile).Assembly, typeof(DataProfile).Assembly,
                typeof(EmailConfigProfile).Assembly);
            services.Configure<EmailConfig>(Configuration.GetSection("EmailConfig"));
            services.Configure<VerificationImagesDirectory>(Configuration.GetSection("VerificationImagesDirectory"));
            services.Configure<ConnectionStrings>(Configuration.GetSection("ConnectionStrings"));
            services.AddSingleton<ManagedByService>();
            services.AddScoped<IEmailSender, EmailSender>();

            services.AddSpaStaticFiles(options =>
            {
                options.RootPath = "ClientApp/build";
            });
            services.AddDbContext<ApplicationDbContext>(ServiceLifetime.Scoped);

            services.AddIdentity<ApplicationUser, IdentityRole<Guid>>(options =>
            {
                //Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequiredUniqueChars = 4;

                //Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.AllowedForNewUsers = true;

                //SignIn settings
                options.SignIn.RequireConfirmedEmail = true;
                options.SignIn.RequireConfirmedPhoneNumber = false;

                //User settings
                options.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true;

                options.Tokens.ProviderMap.Add("CustomEmailConfirmation",
                    new TokenProviderDescriptor(
                typeof(CustomEmailConfirmationTokenProvider<ApplicationUser>)));
                options.Tokens.EmailConfirmationTokenProvider = "CustomEmailConfirmation";
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddTransient<CustomEmailConfirmationTokenProvider<ApplicationUser>>();

            using (var scope = services.BuildServiceProvider().CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            }
            var secretKey = Configuration.GetValue<string>("Jwt:SigningKey");
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.SaveToken = false;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ClockSkew = TimeSpan.Zero,

                    ValidateAudience = true,
                    ValidAudience = Configuration.GetValue<string>("Jwt:AudienceSite"),//www.grasp-erp.io?

                    ValidateIssuer = true,
                    ValidIssuer = Configuration.GetValue<string>("Jwt:IssuerSite"),//www.jwt.io?

                    RequireSignedTokens = true,

                    RequireExpirationTime = true,
                    ValidateLifetime = true,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = signingKey
                };

                options.Events = new JwtBearerEvents()
                {
                    OnTokenValidated = async ctx =>
                    {
                        var role = ctx.Principal.Claims.FirstOrDefault(c => c.Type == "Role").Value;
                        var userId = ctx.Principal.Claims.FirstOrDefault(c => c.Type == "sid").Value;

                        var managedBy = ctx.HttpContext.RequestServices
                            .GetRequiredService<ManagedByService>();

                        managedBy.Role = role;
                        managedBy.ManagedByNumber = userId;

                        return;
                    },
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("Role", "Admin");
                });

                options.AddPolicy("OfficerOnly", policy => policy.RequireClaim("Role", "Officer"));

                options.AddPolicy("AdminOrOfficerOnly", policy => policy.RequireAssertion(
                    context => context.User.HasClaim(
                        c => c.Value == "Admin" || c.Value == "Officer")));
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(cor =>
            {
                cor.AllowAnyHeader();
                cor.AllowAnyOrigin();
                cor.AllowAnyMethod();
            });
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "api/{controller}/{action}/{id?}");
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}