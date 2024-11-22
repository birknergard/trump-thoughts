using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.controllers;

[ApiController]
[Route("api/[controller]")]
public class ApiItemController : ControllerBase{

    private readonly ApiItemContext context;

    // This is a temporary substitute for a database
    private readonly List<ApiItem> _testItems = new List<ApiItem>{
        new ApiItem{
            Id = 1, Name = "First"
        },
        new ApiItem{
            Id = 2, Name = "Second"
        }
    };

    public ApiItemController(ApiItemContext _context){
        context = _context;
    }

    [HttpGet]
    public async Task<List<ApiItem>> Get(){
        return _testItems;
    }


}