using Microsoft.EntityFrameworkCore;

namespace backend.models;

public class ModelContext : DbContext{
   public ModelContext(DbContextOptions<ModelContext> options) : base(options){

   }

    public DbSet<Item> ModelItems {get; set;} = null!;
}