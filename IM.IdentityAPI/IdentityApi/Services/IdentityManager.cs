using IdentityApi.Infrastructure;
using IdentityApi.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IdentityApi.Services
{
    public class IdentityManager : IIdentityManager
    {
        private IdentityDbContext db;
        private IConfiguration configuration;

        public IdentityManager(IdentityDbContext db, IConfiguration configuration)
        {
            this.db = db;
            this.configuration = configuration;
        }

        public async Task<dynamic> AddUserAsyn(User user)
        {
            await db.users.AddAsync(user);
            await db.SaveChangesAsync();
            return new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.ContactNo
            };

        }

        public string ValidateUser(LoginModel user)
        {
            var result = db.users.SingleOrDefault(c => c.Email == user.Email && c.Password == user.Password);
            if (result != null)
            {
                string token = GenerateToken(user.Email, user.Password);
                return token;

            }
            return null;

        }

        private string GenerateToken(string userId, string pwd)
        {
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub,userId),
                new Claim(JwtRegisteredClaimNames.Email,userId),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
            };

            ClaimsIdentity claimIdentity = new ClaimsIdentity(claims, "Token");
            claimIdentity.AddClaim(new Claim(ClaimTypes.Role, "admin"));

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("jwt:secret")));

            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("Jwt:Issuer"),
                audience: configuration.GetValue<string>("jwt:Audience"),
                claims: claimIdentity.Claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credential
                );

            return new JwtSecurityTokenHandler().WriteToken(token);



        }
    }
}
