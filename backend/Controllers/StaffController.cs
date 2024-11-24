using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffController : ControllerBase{

    private readonly TrumpContext context;

    public StaffController(TrumpContext context){
        this.context = context;
    }

    //[HttpPost]
    //public async Task<ActionResult<Staffmember
}