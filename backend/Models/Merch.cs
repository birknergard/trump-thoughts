using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Merch{

    [Key]
    public int Id {get; set;} 

    public double Price {get; set;}
    
    public string ItemName {get; set;} = "";

    public string Category {get; set;} = "";
}