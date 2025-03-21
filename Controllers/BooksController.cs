using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11.Data;  // For BookstoreContext
using Mission11.Models;  // For Book class
using System.Linq;
using System.Threading.Tasks;

namespace Mission11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        // Constructor that injects the BookstoreContext
        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        // GET: api/books?page=1&pageSize=5&sortBy=title
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks(int page = 1, int pageSize = 5, string sortBy = "Title")
        {
            var query = _context.Books.AsQueryable();

            query = sortBy.ToLower() switch
            {
                "title" => query.OrderBy(b => b.Title),
                "author" => query.OrderBy(b => b.Author),
                "price" => query.OrderBy(b => b.Price),
                "isbn" => query.OrderBy(b => b.ISBN),
                "publisher" => query.OrderBy(b => b.Publisher),
                "category" => query.OrderBy(b => b.Category),
                _ => query.OrderBy(b => b.Title),  // Default sorting by Title
            };

            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            return await query.ToListAsync();  // Ensure that all fields, including PageCount, are returned
        }


        // GET: api/books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // POST: api/books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }

        // PUT: api/books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to check if a book exists
        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.BookId == id);
        }
    }
}
