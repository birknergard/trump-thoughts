using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Merch{

    [Key]
    int Id {get; set;} 
    string ItemName {get; set;} = "";
    string Category {get; set;} = "Uncategorized";
}