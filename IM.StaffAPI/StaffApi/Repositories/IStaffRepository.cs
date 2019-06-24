using StaffApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StaffApi.Repositories
{
    public interface IStaffRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll();

        T Get(int id);
        Task<T> AddAsync(T item);

        Task<T> updateAsync(int id, T item);

        Task<T> DeleteAsync(int id);
    }
}
