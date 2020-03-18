using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;

namespace DryvaDriverVerification
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var webHost = WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(ConfigConfiguration)
                .ConfigureLogging(ConfigureLogger)
                .UseStartup<Startup>()
                .Build();

            webHost.Run();
        }

        private static void ConfigConfiguration(WebHostBuilderContext ctx, IConfigurationBuilder config)
        {
            config.SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
              .AddJsonFile($"appsettings.{ctx.HostingEnvironment.EnvironmentName}.json", optional: false, reloadOnChange: true)
              .AddEnvironmentVariables();
        }

        private static void ConfigureLogger(WebHostBuilderContext ctx, ILoggingBuilder logging)
        {
            logging.AddConfiguration(ctx.Configuration.GetSection("Logging"));
            logging.AddConsole();
            logging.AddDebug();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((ctx, cfg) =>
                {
                    cfg.SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .AddJsonFile($"appsettings.{ctx.HostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables();
                })
                .ConfigureLogging((ctx, logging) => { })
                .UseStartup<Startup>()
                .Build();
        }
    }
}