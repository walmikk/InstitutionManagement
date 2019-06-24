using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StaffApi.Model;
using StaffApi.Repositories;

namespace StaffApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffsController : ControllerBase
    {
        private IStaffRepository<StaffData> staffRepo;

        public StaffsController(IStaffRepository<StaffData> staffRepo)
        {
            this.staffRepo = staffRepo;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<StaffData>> GetStaffs()
        {
            var Staffs = staffRepo.GetAll();
            return Staffs.ToList();
        }

        [HttpGet("{id}.{format?}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<StaffData> GetById([FromRoute]int id)
        {
            var item = staffRepo.Get(id);
            return Ok(item);

        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<StaffData>> AddStaff([FromBody]StaffData ev)
        {
            var result = await staffRepo.AddAsync(ev);

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<StaffData>> UpdateStaff([FromBody]StaffData ev, int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var result = await staffRepo.updateAsync(id, ev);
            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult<StaffData>> DeleteStaff(int id)
        {
            var result = await staffRepo.DeleteAsync(id);
            return Ok();
        }
    }
}