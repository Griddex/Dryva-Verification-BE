namespace DryvaDriverVerification.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public string DriversAddressLine1 { get; set; }
        public string DriversAddressLine2 { get; set; }
        public string DriversPostalCode { get; set; }
        public string DriversCountry { get; set; }
        public string DriversState { get; set; }
        public string DriversCity { get; set; }
    }
}