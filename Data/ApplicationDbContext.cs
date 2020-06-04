using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Citizens.Data.Identity;
using Citizens.Data.Entities;

namespace Citizens.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>,IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {}

        public DbSet<Member> Members { get; set; }
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Conversation> Conversations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<ApplicationUser>()
                .HasOne(u => u.Member)
                .WithOne(m => m.Identity)
                .HasForeignKey<Member>(m => m.IdentityId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Member>()
                .HasOne(m => m.Identity)
                .WithOne(u => u.Member)
                .HasForeignKey<Member>(m => m.IdentityId);

            builder.Entity<Member>()
                .HasMany(m => m.Conversations)
                .WithOne(c => c.Starter)
                .HasForeignKey(c => c.StarterId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Conversation>()
                .HasOne(c => c.Starter)
                .WithMany(s => s.Conversations)
                .HasForeignKey(c => c.StarterId);

            builder.Entity<Discussion>()
                .HasMany(d => d.Conversations)
                .WithOne(c => c.Discussion)
                .HasForeignKey(c => c.DiscussionId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Conversation>()
                .HasOne(c => c.Discussion)
                .WithMany(d => d.Conversations)
                .HasForeignKey(c => c.DiscussionId);
        }

        public override int SaveChanges()
        {
            var changedEntities = ChangeTracker.Entries();

            foreach (var changedEntity in changedEntities)
            {
                if (changedEntity.Entity is Entity)
                {
                    var entity = changedEntity.Entity as Entity;
                    if (changedEntity.State == EntityState.Added)
                    {
                        entity.Created = DateTime.Now;
                        entity.Updated = DateTime.Now;
                        
                    }
                    else if (changedEntity.State == EntityState.Modified)
                    {
                        entity.Updated = DateTime.Now;
                    }
                }

            }
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var changedEntities = ChangeTracker.Entries();

            foreach (var changedEntity in changedEntities)
            {
                if (changedEntity.Entity is Entity)
                {
                    var entity = changedEntity.Entity as Entity;
                    if (changedEntity.State == EntityState.Added)
                    {
                        entity.Created = DateTime.Now;
                        entity.Updated = DateTime.Now;
                        
                    }
                    else if (changedEntity.State == EntityState.Modified)
                    {
                        entity.Updated = DateTime.Now;
                    }
                }
            }
            return (await base.SaveChangesAsync(true, cancellationToken));
        }
    }
}