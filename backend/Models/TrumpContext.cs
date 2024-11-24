using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class TrumpContext : DbContext{
    public DbSet<Thought> Thoughts {get; set;} = null!;
    public DbSet<Product> Merchandise {get; set;} = null!;
    public DbSet<StaffMember> Personnel {get; set;} = null!;
    public TrumpContext(DbContextOptions<TrumpContext> options) : base(options){}
}