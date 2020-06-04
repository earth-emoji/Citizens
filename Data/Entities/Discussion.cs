using System.Collections.Generic;

namespace Citizens.Data.Entities
{
    public class Discussion : Entity
    {
        public string Name { get; set; }
        public ICollection<Conversation> Conversations { get; set; }
    }
}