using IdentityApi.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityApi.Infrastructure
{
    public class IdentityDbContext : DbContext
    {

        public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options)
        {

        }

        public DbSet<User> users { get; set; }
    }
}
