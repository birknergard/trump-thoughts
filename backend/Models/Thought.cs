using System.ComponentModel.DataAnnotations;
using backend.Models;

public enum Topic : string {
}
public class Thought{
     
    [Key]
    public int Id {get; set;}
    
    public string Statement {get; set;} = "";

    public string Topic {get; set;} = "";

}