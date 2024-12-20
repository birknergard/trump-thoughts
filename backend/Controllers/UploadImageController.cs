using Microsoft.AspNetCore.Mvc;
namespace backend.controllers;

[ApiController]
[Route("[controller]")]
public class UploadImageController : ControllerBase{
    private readonly IWebHostEnvironment hosting;

    public UploadImageController(IWebHostEnvironment hosting){
        this.hosting = hosting;
    }

    [HttpPost]
    public IActionResult SaveImage(IFormFile file){
        if(file == null || file.Length == 0){
            return BadRequest("No file uploaded.");
        } 
        
        string wwwrootPath = hosting.WebRootPath;
        string absolutePath = Path.Combine(wwwrootPath, "images", file.FileName);

        var directory = Path.GetDirectoryName(absolutePath);

        if(!Directory.Exists(directory)){
           Directory.CreateDirectory(directory);
        }

        using(var fileStream = new FileStream(absolutePath, FileMode.Create)){
            file.CopyTo(fileStream);
        }
        return Ok(new {FileName = file.FileName});
    }

    [HttpDelete("{imageUrl}")]  
    public IActionResult DeleteImage(string imageUrl){
        try {
            string wwwrootPath = hosting.WebRootPath;
            string imagePath = Path.Combine(wwwrootPath, "images", imageUrl);

            if(!System.IO.File.Exists(imagePath)){
                return NotFound(new {message = "File not found.", onUrl = imageUrl, fullPath = imagePath});
            }

            System.IO.File.Delete(imagePath);

            return Ok(new { message = "File deleted.", onUrl = imageUrl, fullPath = imagePath});

        } catch (Exception e) {
            return StatusCode(500, new {message = "An error occurred while attemtping to delete the file", error = e.Message});
        }
    }

    [HttpPost("temp")]
    public IActionResult SaveTempImage(IFormFile file){
        if(file == null || file.Length == 0){
            return BadRequest("No file uploaded.");
        } 
        
        string wwwrootPath = hosting.WebRootPath;
        string absolutePath = Path.Combine(wwwrootPath, "temp", file.FileName);

        var directory = Path.GetDirectoryName(absolutePath);

        if(!Directory.Exists(directory)){
           Directory.CreateDirectory(directory);
        }

        using(var fileStream = new FileStream(absolutePath, FileMode.Create)){
            file.CopyTo(fileStream);
        }
        return Ok(new {FileName = file.FileName});
    }

    [HttpPost("process/{imageUrl}")]
    public IActionResult ProcessImage(string imageUrl){
        if(string.IsNullOrEmpty(imageUrl)){
            return BadRequest("No image url provided.");
        }
        string wwwrootPath = hosting.WebRootPath;
        string currentPath = Path.Combine(wwwrootPath, "temp", imageUrl);
        
        string destinationPath = Path.Combine(wwwrootPath, "images", imageUrl);
        try{
            if(!System.IO.File.Exists(currentPath)){
                return NotFound( new {message = "Image could not be found in temp.", path = currentPath});
            }

            System.IO.File.Move(currentPath, destinationPath);
            return Ok("Image moved successfully from temporary storage to server.");

        } catch (Exception e) {
            return StatusCode(500, e);
        }
    }

    [HttpDelete("temp/{imageUrl}")]
     public IActionResult DeleteTempImage(string imageUrl){
        try {
            string wwwrootPath = hosting.WebRootPath;
            string imagePath = Path.Combine(wwwrootPath, "temp", imageUrl);

            if(!System.IO.File.Exists(imagePath)){
                return NotFound(new {message = "File not found.", onUrl = imageUrl, fullPath = imagePath});
            }

            System.IO.File.Delete(imagePath);

            return Ok(new { message = "File deleted.", onUrl = imageUrl, fullPath = imagePath});

        } catch (Exception e) {
            return StatusCode(500, new {message = "An error occurred while attemtping to delete the file", error = e.Message});
        }
    }


}