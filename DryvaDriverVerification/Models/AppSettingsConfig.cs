using System.Collections.Generic;

namespace DryvaDriverVerification.Models
{
    public class AppSettingsConfig
    {
        public Dictionary<string, LogLevel> Logging { get; set; }
        public EmailConfig EmailConfig { get; set; }
        public string AllowedHosts { get; set; } = "*";
    }
}