using System.ComponentModel.DataAnnotations;
using backend.Models;

public class TrumpMerch{

    [Key]
    int Id {get; set;}
    string ItemName {get; set;}
    string Category {get; set;} = "Uncategorized";
}