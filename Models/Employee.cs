using System;
using System.Collections.Generic;

namespace BackboneData.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public string Location { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public List<Company> Opportunities { get; set; }
    }
}