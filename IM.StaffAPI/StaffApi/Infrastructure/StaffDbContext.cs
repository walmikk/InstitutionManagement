using Microsoft.EntityFrameworkCore;
using StaffApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StaffApi.Infrastructure
{
    public class StaffDbContext :DbContext
    {
        public StaffDbContext(DbContextOptions<StaffDbContext> options) : base(options)
        {

        }

        public DbSet<StaffData> users { get; set; }

    }
}
