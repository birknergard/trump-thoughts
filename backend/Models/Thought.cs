using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Thought{

    [Key]
    public int Id {get; set;}
    
    public string Statement {get; set;} = "";

    public string Category {get; set;} = "Uncategorized";

}