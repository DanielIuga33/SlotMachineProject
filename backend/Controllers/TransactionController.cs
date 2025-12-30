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
            // 1. Verificăm dacă userul (Daniel) există
            var user = await _userService.GetByIdAsync(request.UserId);
            if (user == null) return NotFound("Utilizatorul nu a fost găsit.");

            // 2. Actualizăm balanța (Logic: Balanță nouă = Balanță veche + Sumă depusă)
            user.Balance += request.Amount;

            // 3. Salvăm modificarea în baza de date prin serviciul tău
            // Trebuie să ai o metodă UpdateAsync în IUserService
            await _userService.UpdateUserAsync(user);

            // 4. Aici în mod normal ai salva și în tabelul de Tranzacții
            // await _transactionService.AddAsync(request); 

            return Ok(new { message = "Depunere realizată!", newBalance = user.Balance });
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