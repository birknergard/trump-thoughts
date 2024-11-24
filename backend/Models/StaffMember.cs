using System.ComponentModel.DataAnnotations;
using backend.Models;

public class StaffMember{

    [Key]
    public int Id {get; set;}
    
    public string Name {get; set;} = "";
    public string ImageUrl {get; set;} = "";
}