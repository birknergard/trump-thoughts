using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonnelController : ControllerBase{

    private readonly TrumpContext context;

    public PersonnelController(TrumpContext context){
        this.context = context;
    }

    [HttpPost]
    public async Task<ActionResult<StaffMember>> Post([FromBody] StaffMember staffMember){
        if(staffMember == null){
            return BadRequest("No data provided.");
        }

        if(string.IsNullOrEmpty(staffMember.Name)){
            return BadRequest("No name data provided.");
        }

        // image has to be provided.
        if(string.IsNullOrEmpty(staffMember.ImageUrl)){
            return BadRequest("No image provided.");
        }

        await context.SaveChangesAsync();
        return CreatedAtAction("GetById", new {id = staffMember.Id}, staffMember);
    }

    [HttpGet]
    public async Task<List<StaffMember>> Get(){
        List<StaffMember> staffMembers = await context.Personnel.ToListAsync();
        return staffMembers;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StaffMember>> GetById(int id){
        StaffMember? staffMember = await context.Personnel.FindAsync(id);
        if(staffMember == null){
            return NoContent();
        }

        return Ok(staffMember);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<StaffMember>> Put(int id, StaffMember modifiedStaffMember){
        StaffMember? memberToUpdate = await context.Personnel.FindAsync(id);

        // returns early if result is null
        if(memberToUpdate == null) return NoContent();
        
        context.Entry(memberToUpdate).CurrentValues.SetValues(modifiedStaffMember);
        context.Entry(memberToUpdate).State = EntityState.Modified;

        return NoContent();

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<StaffMember>> Delete(int id){
        StaffMember? memberToDelete = await context.Personnel.FindAsync(id);
        if(memberToDelete != null){
            context.Personnel.Remove(memberToDelete);
            await context.SaveChangesAsync();
        }
        return NoContent();
    }
}
