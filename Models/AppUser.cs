using Microsoft.AspNetCore.Identity;

namespace BackboneData.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public bool isAdmin { get; set; }
        public string Bio { get; set; }
    }
}