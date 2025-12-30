using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")] // Aceasta va genera ruta api/Transaction
public class TransactionController : ControllerBase
{
    private readonly IUserService _userService;
    // Presupunem că ai un serviciu pentru tranzacții, dacă nu, folosim userService momentan
    public TransactionController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] TransactionRequest request)
    {
        try
        {
            var user = await _userService.GetByIdAsync(request.UserId);
            if (user == null) return NotFound("Utilizatorul nu a fost găsit.");

            // --- LOGICA NOUĂ ---
            if (request.Type == "Depunere")
            {
                user.Balance += request.Amount;
            }
            else if (request.Type == "Retragere")
            {
                // Verificăm dacă are destui bani pentru retragere
                if (user.Balance < request.Amount)
                {
                    return BadRequest(new { message = "Fonduri insuficiente pentru retragere!" });
                }
                user.Balance -= request.Amount; // Scădem suma
            }
            // -------------------

            await _userService.UpdateUserAsync(user);

            // Mesaj dinamic pentru răspuns
            string mesajSucces = request.Type == "Depunere" ? "Depunere realizată!" : "Retragere realizată!";

            return Ok(new { message = mesajSucces, newBalance = user.Balance });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}

// DTO pentru cererea de tranzacție
public class TransactionRequest
{
    public int UserId { get; set; }
    public decimal Amount { get; set; }
    public string Type { get; set; }
    public string Date { get; set; }
}