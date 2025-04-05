namespace Mission11.Models
{
    public class Book
    {
        public int BookId { get; set; }  // Primary key for the book
        public string Title { get; set; }  // Title of the book
        public string Author { get; set; }  // Author of the book
        public string Publisher { get; set; }  // Publisher of the book
        public string ISBN { get; set; }  // ISBN number of the book
        public string Category { get; set; }  // Book's category
        public int PageCount { get; set; }  // Number of pages in the book
        public decimal Price { get; set; }  // Price of the book
        
        public string Classification { get; set; } 
    }
}