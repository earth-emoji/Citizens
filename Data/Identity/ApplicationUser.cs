using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Citizens.Data.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public Member Member { get; set; }
        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}