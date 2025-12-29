using backend.Data;
using backend.Repositories;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Adăugare Servicii de bază
builder.Services.AddControllers();

// 2. Configurare Baza de Date (TREBUIE SĂ FIE AICI, ÎNAINTE DE BUILD)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Configurare CORS
builder.Services.AddCors(options => {
    options.AddPolicy("DevCors", policy => {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 4. Înregistrare Repository și Service (Dependency Injection)
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

// AICI SE ÎNCHIDE CONFIGURAREA SERVICIILOR
var app = builder.Build();

//am adaugat asta ca sa se creeze tabelele automat daca nu exista deja -Andreea
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated(); // Această linie creează tabelele dacă ele lipsesc
}


// 5. Configurare Pipeline (Middleware)
if (app.Environment.IsDevelopment())
{
    // Aici poți activa Swagger dacă îl repari ulterior
}

app.UseHttpsRedirection();

// CORS trebuie să fie înainte de MapControllers
app.UseCors("DevCors");

app.UseAuthorization();

app.MapControllers();

app.Run();