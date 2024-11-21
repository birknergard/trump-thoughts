using Microsoft.EntityFrameworkCore;

namespace backend.models;

public class ApiContext : DbContext{
    public ApiContext(DbContextOptions<ApiContext> options){
        : base(options){}

        public DbSet<Fruit> Fruits {get; set; } = null!;
    }
}