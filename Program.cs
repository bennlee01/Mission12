using Microsoft.EntityFrameworkCore;
using Mission11.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container

// Configure the SQLite database context
builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreDb"))); 

// Add support for controllers (API endpoints)
builder.Services.AddControllers();

// Add Swagger for API documentation
builder.Services.AddSwaggerGen();

// Configure CORS to allow the React app to make requests
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        // Allow requests from React app running on localhost:3000
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();  // Build the app with the configured services

// Enable CORS with the defined policy
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    // Enable Swagger in development mode for API testing
    app.UseSwagger();
    app.UseSwaggerUI();  
}

app.UseHttpsRedirection();  // Redirect HTTP to HTTPS
app.UseAuthorization();  // Ensure authorization for requests

app.MapControllers();  // Map controller actions to API routes

app.Run();  // Run the application