using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers;

[ApiController]
[Route("api/[controller]")]
public class MerchController : ControllerBase{

    private readonly TrumpContext context;

    public MerchController(TrumpContext context){
        this.context = context;
    }
    
    [HttpPost] 
    public async Task<ActionResult<Merch>> Post([FromBody] Merch newMerch){
        if(newMerch == null){
            return BadRequest("Error: No data provided.");
        }

        if(string.IsNullOrEmpty(newMerch.ItemName)){
            return BadRequest("Error: No name provided.");
        }

        if(string.IsNullOrEmpty(newMerch.Category)){
           return BadRequest("Error: No category provided.");
        }

        if(newMerch.Price == 0){
           return BadRequest("Error: No price provided.");
        }

        context.Merchandise.Add(newMerch);
        await context.SaveChangesAsync();
        return CreatedAtAction("GetById", new {id = newMerch.Id}, newMerch);
    }

    [HttpGet]
    public async Task<List<Merch>> Get(){
        List<Merch> merchandise = await context.Merchandise.ToListAsync();
        return merchandise;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Merch>> GetById(int id){
        Merch? merch = await context.Merchandise.FindAsync(id);
        if(merch != null){
            return NotFound();
        } else {
            return Ok(merch);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Merch>> Put(string id, Merch modifiedMerch){
        Merch? merchToUpdate = await context.Merchandise.FindAsync(id);
    
        if(merchToUpdate == null){
            return NotFound();
        }
        context.Entry(merchToUpdate).CurrentValues.SetValues(modifiedMerch);
        context.Entry(merchToUpdate).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Merch>> Delete(int id){
        Merch? merch = await context.Merchandise.FindAsync(id);
        if(merch != null){
            context.Merchandise.Remove(merch);
            await context.SaveChangesAsync();
        }
        return NoContent();
    }    

}