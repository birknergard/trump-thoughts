using System.ComponentModel.DataAnnotations;

namespace backend.models;

public class Item{
    
    [Key]
    public int Id {get;set;}
    public string? Name {get;set;}
}