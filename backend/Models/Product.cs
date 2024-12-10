using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Product{

    [Key]
    public int Id {get; set;} 

    public double Price {get; set;}
    
    public string ItemName {get; set;} = "";

    public string Description {get; set;} = "";
}