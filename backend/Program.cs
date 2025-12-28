var builder = WebApplication.CreateBuilder(args);

// Servicii de bază
builder.Services.AddControllers();

// Adaugă asta pentru React (CORS)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowReact"); // Permite React-ului să vorbească cu C#
app.MapControllers();

app.Run();