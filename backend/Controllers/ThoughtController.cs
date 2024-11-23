using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.controllers;

[ApiController]
[Route("api/[controller]")]
public class ThoughtController : ControllerBase{

    private readonly TrumpContext context;

    public ThoughtController(TrumpContext context) {
        this.context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Thought>> Post([FromBody] Thought newThought){
        if(newThought == null){
            return BadRequest("Error: No data provided.");
        }

        if(string.IsNullOrEmpty(newThought.Statement)){
            return BadRequest("Error: No thought provided.");
        }

        if(string.IsNullOrEmpty(newThought.Category)){
            return BadRequest("Error: No category provided.");
        }

        context.Thoughts.Add(newThought);
        await context.SaveChangesAsync();
        return CreatedAtAction("GetById", new {id = newThought.Id}, newThought);
    }

    [HttpGet]
    public async Task<List<Thought>> GetAll(){
        List<Thought> thoughts = await context.Thoughts.ToListAsync();
        return thoughts;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Thought>> GetById(int id){
        Thought? thought = await context.Thoughts.FindAsync(id);

        if(thought != null){
            return Ok(thought);
        } else {
            return NotFound();
        }
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult<Thought>> Put(string id, Thought modifiedThought){
        Thought? thoughtToUpdate = await context.Thoughts.FindAsync(id);
        if(thoughtToUpdate == null){
            return NotFound();
        }
        context.Entry(thoughtToUpdate).CurrentValues.SetValues(modifiedThought);
        context.Entry(thoughtToUpdate).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Thought>> Delete(int id){
        Thought? thought = await context.Thoughts.FindAsync(id);
        if(thought != null){
            context.Thoughts.Remove(thought);
            await context.SaveChangesAsync();
        }
        return NoContent();
    }

}