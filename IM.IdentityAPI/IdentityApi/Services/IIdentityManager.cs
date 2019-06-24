using IdentityApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityApi.Services
{
    public interface IIdentityManager
    {
        Task<dynamic> AddUserAsyn(User user);

        string ValidateUser(LoginModel model);

    }
}
