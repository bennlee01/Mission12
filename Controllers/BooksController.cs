using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11.Data;  // For BookstoreContext
using Mission11.Models;  // For Book class
using System.Linq;
using System.Threading.Tasks;
using System;

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

        // GET: api/books?page=1&pageSize=5&sortBy=title&sortOrder=asc&category=biography
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks(int page = 1, int pageSize = 5, string sortBy = "Title", string sortOrder = "asc", string category = null)
        {
            var query = _context.Books.AsQueryable();

            // Apply category filter if provided (case-insensitive)
            if (!string.IsNullOrEmpty(category) && category.ToLower() != "all")
            {
                query = query.Where(b => b.Category.ToLower() == category.ToLower());
            }

            // Apply sorting logic
            switch (sortBy.ToLower())
            {
                case "title":
                    query = sortOrder == "asc" ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title);
                    break;
                case "author":
                    query = sortOrder == "asc" ? query.OrderBy(b => b.Author) : query.OrderByDescending(b => b.Author);
                    break;
                case "price":
                    query = sortOrder == "asc" ? query.OrderBy(b => b.Price) : query.OrderByDescending(b => b.Price);
                    break;
                case "pagecount":
                    query = sortOrder == "asc" ? query.OrderBy(b => b.PageCount) : query.OrderByDescending(b => b.PageCount);
                    break;
                default:
                    query = query.OrderBy(b => b.Title);  // Default sorting by Title
                    break;
            }

            // Apply pagination
            var totalItems = await query.CountAsync(); // Get total number of items
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize); // Calculate total pages
            var books = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            // Return paginated books along with total pages and total items for frontend use
            return Ok(new { books, totalPages, totalItems });
        }

        // GET: api/books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            // Find the book by its ID
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                // If the book doesn't exist, return 404
                return NotFound();
            }

            // Return the found book
            return book;
        }

        // POST: api/books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            // Add the new book to the database
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            // Return a created response with the new book
            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }

        // PUT: api/books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                // If the ID in the URL doesn't match the book's ID, return a bad request
                return BadRequest();
            }

            // Mark the book as modified
            _context.Entry(book).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // If there's a concurrency issue or the book doesn't exist, return 404
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Return no content on successful update
            return NoContent();
        }

        // DELETE: api/books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            // Find the book by ID
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                // If the book doesn't exist, return 404
                return NotFound();
            }

            // Remove the book from the database
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            // Return no content on successful deletion
            return NoContent();
        }

        // Helper method to check if a book exists
        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.BookId == id);
        }
    }
}
