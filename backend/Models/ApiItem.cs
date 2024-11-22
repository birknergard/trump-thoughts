using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class ApiItem{
    
    [Key]
    public int Id {get;set;}
    public string? Name {get;set;}
}