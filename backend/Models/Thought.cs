using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

public class Thought{
     
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id {get; set;}

    public string ImageUrl {get; set;} = "";
   
    public string Statement {get; set;} = "";

    public string Topic {get; set;} = "";
    
    public string Title {get; set;} = "";

    public string Tone {get; set;} = "";

}