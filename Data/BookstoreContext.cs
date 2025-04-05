using Microsoft.EntityFrameworkCore;
using Mission11.Models;

namespace Mission11.Data
{
    public class BookstoreContext : DbContext
    {
        // Constructor that passes options to the base DbContext class
        public BookstoreContext(DbContextOptions<BookstoreContext> options)
            : base(options)
        { }

        // DbSet representing the 'Books' table in the database
        public DbSet<Book> Books { get; set; }  
    }
}