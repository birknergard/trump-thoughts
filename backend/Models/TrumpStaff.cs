using System.ComponentModel.DataAnnotations;
using backend.Models;

public class TrumpStaff{

    [Key]
    int Id {get; set;}
    string Name {get; set;}
    FileStream Image {get; set;} = null;
}