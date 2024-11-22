using System.ComponentModel.DataAnnotations;
using backend.Models;

public class Staff{

    [Key]
    int Id {get; set;}
    string Name {get; set;} = "";
    string ImageUrl {get; set;} = "";
}