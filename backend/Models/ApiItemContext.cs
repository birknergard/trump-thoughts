using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class ApiItemContext : DbContext{
   public ApiItemContext(DbContextOptions<ApiItemContext> opt) : base(opt){

   }

    public DbSet<ApiItem> ModelItems {get; set;} = null!;
}