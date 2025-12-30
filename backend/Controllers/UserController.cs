using backend.Models;
using backend.Services;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
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

        [HttpPost("auth")]
        public async Task<IActionResult> Auth([FromBody] LoginRequest loginData)
        {
            if (loginData == null || string.IsNullOrEmpty(loginData.Password))
                return BadRequest("Date incomplete.");

            var user = await _userService.FindByEmail(loginData.Email);

            if (user == null || user.Id == 0) // Verificare dacă userul e valid
            {
                return Unauthorized("Utilizatorul nu există.");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginData.Password, user.PasswordHash);

            if (!isPasswordValid)
            {
                return Unauthorized("Parolă incorectă.");
            }

            return Ok(new
            {
                message = "Login successful",
                userId = user.Id
            });
        }

        // ANDREEA: MODIFICARE - Metoda de Update mutată în afara lui Auth
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UserUpdateDto updateDto)
        {
            try
            {
                var user = await _userService.GetByIdAsync(id);

                if (user == null)
                    return NotFound(new { message = "Utilizatorul nu a fost găsit." });

                user.FirstName = updateDto.FirstName;
                user.LastName = updateDto.LastName;

                if (!string.IsNullOrEmpty(updateDto.Password))
                {
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateDto.Password);
                }

                await _userService.UpdateUserAsync(user);

                return Ok(new { message = "Profilul a fost actualizat cu succes!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Eroare la server: " + ex.Message });
            }
        }
    }

    // ANDREEA: DTO definit în afara clasei controller-ului pentru claritate
    public class UserUpdateDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Password { get; set; }
    }
}