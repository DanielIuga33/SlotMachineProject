using backend.Models;
using backend.Services;
using backend.DTOs; // Adaugă asta!
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var newUser = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                CNP = request.CNP,
                Address = request.Address
            };

            var createdUser = await _userService.RegisterAsync(newUser, request.Password);

            return Ok(new
            {
                message = "Înregistrare reușită!",
                userId = createdUser.Id,
                balance = createdUser.Balance
            });
        }
        catch (Exception ex)
        {
            // Dacă service-ul aruncă o eroare (ex: email duplicat), o prindem aici
            return BadRequest(new { message = ex.Message });
        }
    }
    [HttpGet("check-email/{email}")]
    public async Task<ActionResult<bool>> ExistByEmail(string email)
    {
        bool answer = await _userService.ExistByEmail(email);
        return Ok(answer);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user == null) return NotFound(new { message = "Utilizatorul nu există." });
        return Ok(user);
    }
}