using System;
using System.ComponentModel.DataAnnotations;

namespace Citizens.Data.Identity
{
    public class Profile : Entity
    {
        public string IdentityId { get; set; }   
        public ApplicationUser Identity { get; set; }  // navigation property
    }
}