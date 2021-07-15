using System;

namespace BackboneData.Models
{
    public class Stage
    {
        public Guid Id { get; set; }
        public string Status { get; set; }
        public string Percentage { get; set; }
        public string Commissions { get; set; }
        public string Company { get; set; }
        public string UpdatedAt { get; set; }
        public string Remarks { get; set; }
    }
}