using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityApi.Model;
using IdentityApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IdentityApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private IIdentityManager idManager;

        public IdentityController(IIdentityManager idManager)
        {
            this.idManager = idManager;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<dynamic>> Register([FromBody]User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await idManager.AddUserAsyn(user);
            return Created("", result);

        }


        [HttpPost("token")]
        public ActionResult<string> Token([FromBody]LoginModel login)
        {
            var token = idManager.ValidateUser(login);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized();
            }
            return Ok(token);
        }
    }
}