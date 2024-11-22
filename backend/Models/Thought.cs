using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Thought{

    [Key]
    int Id {get; set;}
    
    string Statement {get; set;} = "";

    string Category {get; set;} = "Uncategorized";

}