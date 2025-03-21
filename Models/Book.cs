namespace Mission11.Models
{
    public class Book
    {
        public int BookId { get; set; }  // Primary key
        public string Title { get; set; }  // Book Title
        public string Author { get; set; }  // Book Author
        public string Publisher { get; set; }  // Book Publisher
        public string ISBN { get; set; }  // Book ISBN
        public string Classification { get; set; }  // Book Category
        public string Category { get; set; } 
        public int PageCount { get; set; }  // Number of Pages
        public decimal Price { get; set; }  // Price of the book
    }
}