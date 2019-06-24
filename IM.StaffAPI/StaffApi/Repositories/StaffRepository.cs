using Microsoft.EntityFrameworkCore;
using StaffApi.Infrastructure;
using StaffApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StaffApi.Repositories
{
    public class StaffRepository<T> : IStaffRepository<T> where T : BaseEntity
    {
        private StaffDbContext dbCpntext;
        private DbSet<T> entities;
        public StaffRepository(StaffDbContext db)
        {
            dbCpntext = db;
            entities = dbCpntext.Set<T>();
        }

        public async Task<T> AddAsync(T item)
        {
            await entities.AddAsync(item);
            await dbCpntext.SaveChangesAsync();
            return item;
        }

        public async Task<T> DeleteAsync(int id)
        {
            var item = await entities.FindAsync(id);
            if (item == null)
            {
                throw new Exception("item not found");
            }
            entities.Remove(item);
            await dbCpntext.SaveChangesAsync();
            return item;
        }

        public T Get(int id)
        {
            var item = entities.Find(id);
            return item;
        }

        public IEnumerable<T> GetAll()
        {
            return entities.ToList();
        }

        public async Task<T> updateAsync(int id, T item)
        {
            entities.Update(item).State = EntityState.Modified;
            await dbCpntext.SaveChangesAsync();

            return item;
        }
    }
}
