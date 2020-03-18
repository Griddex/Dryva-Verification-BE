using System.Text.Json.Serialization;

namespace DryvaDriverVerification.Models
{
    public class LogLevel
    {
        public string Default { get; set; }
        public string Microsoft { get; set; }

        [JsonPropertyName("Microsoft.Hosting.Lifetime")]
        public string MicrosoftHostingLifetime { get; set; }
    }
}