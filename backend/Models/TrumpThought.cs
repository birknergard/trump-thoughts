using System.ComponentModel.DataAnnotations;
using backend.Models;

public class TrumpThought{

    [Key]
    int Id {get; set;}
    
    string Thought {get; set;}

    string Category {get; set;} = "Uncategorized";

}