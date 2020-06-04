using Citizens.Data.Identity;

namespace Citizens.Data.Entities
{
    public class Conversation : Entity
    {
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool IsPrivate { get; set; }
        public long StarterId { get; set; }
        public Member Starter { get; set; }
        public long DiscussionId { get; set; }
        public Discussion Discussion { get; set; }
    }
}