using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase{

    private readonly TrumpContext context;

    public ProductController(TrumpContext context){
        this.context = context;
    }
    
    [HttpPost] 
    public async Task<ActionResult<Product>> Post([FromBody] Product newProduct){
        if(newProduct == null){
            return BadRequest("Error: No data provided.");
        }

        if(string.IsNullOrEmpty(newProduct.ItemName)){
            return BadRequest("Error: No name provided.");
        }

        if(newProduct.Price == 0){
           return BadRequest("Error: No price provided.");
        }

    //context.Merchandise.Add(newProduct);
        await context.SaveChangesAsync();
        return CreatedAtAction("GetById", new {id = newProduct.Id}, newProduct);
    }

    [HttpGet]
    public async Task<List<Product>> Get(){
        List<Product> merchandise = await context.Merchandise.ToListAsync();
        return merchandise;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id){
        Product? merch = await context.Merchandise.FindAsync(id);
        if(merch == null){
            return NotFound();
        } else {
            return Ok(merch);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> Put(string id, Product modifiedProduct){
        Product? merchToUpdate = await context.Merchandise.FindAsync(id);
    
        if(merchToUpdate == null){
            return NotFound();
        }
        context.Entry(merchToUpdate).CurrentValues.SetValues(modifiedProduct);
        context.Entry(merchToUpdate).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Product>> Delete(int id){
        Product? product = await context.Merchandise.FindAsync(id);
        if(product != null){
  //          context.Merchandise.Remove(product);
            await context.SaveChangesAsync();
        }
        return NoContent();
    }    

}