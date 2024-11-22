using Microsoft.AspNetCore.Mvc;
namespace backend.controllers;

public class UploadImageController : ControllerBase{
    private readonly IWebHostEnvironment hosting;

    public UploadImageController(IWebHostEnvironment hosting){
        this.hosting = hosting;
    }
}