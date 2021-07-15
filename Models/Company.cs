using System;
using System.Collections.Generic;

namespace BackboneData.Models
{
    public class Company
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Industry { get; set; }
        public string Size { get; set; }
        public string TargetMarket { get; set; }
        public string OperatingRegion { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string WebsiteLink { get; set; }
        public string PhoneNumber { get; set; }
        public string Agent { get; set; }
        public string LandLine { get; set; }
        public string UpdatedAt { get; set; }
        public string Remarks { get; set; }
        public List<Stage> Stages { get; set; }
    }
}