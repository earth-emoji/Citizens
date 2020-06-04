using System.Collections.Generic;
using Citizens.Data.Entities;

namespace Citizens.Data.Identity
{
    public class Member : Profile
    {
        public ICollection<Conversation> Conversations { get; set; }
    }
}