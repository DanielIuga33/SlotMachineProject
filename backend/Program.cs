using backend.Data;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

// 1. Definim politica CORS
builder.Services.AddCors(options => {
    options.AddPolicy("DevCors", policy => {
        policy.WithOrigins("http://localhost:3000") // Adresa React
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// 2. Activăm CORS (trebuie pus înainte de MapControllers)
app.UseCors("DevCors");

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));