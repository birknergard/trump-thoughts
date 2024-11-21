using Microsoft.AspNetCore.Mvc;
using backend.models;
using Microsoft.Extensions.Localization;

namespace backend.controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase{

    // This is a temporary substitute for a database
    private List<Item> items = new List<Item>{
        new Item{
            Id = 1, Name = "First"
        },
        new Item{
            Id = 2, Name = "Second"
        }
    };

    [HttpGet]
    public List<Item> Get(){
        return items;
    }


}