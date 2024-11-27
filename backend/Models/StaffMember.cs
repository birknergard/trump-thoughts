using System.ComponentModel.DataAnnotations;
using backend.Models;

public class StaffMember{

      [Key]
      public int Id {get; set;}

      public string Name {get; set;} = "";
      public int Age {get; set;}
      public string ImageUrl {get; set;} = "";
      public string Title {get; set;} = "";
      public string Description {get; set;} = "";
}