using backend.Models;
using backend.Repositories; // Importăm Repository-ul
using BCrypt.Net;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository; // Folosim Repository-ul, nu Context-ul

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            // Folosim repository-ul pentru a căuta
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<bool> ExistByEmail(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);

            // Dacă user nu este null, înseamnă că există în baza de date
            return user != null;
        }

        public async Task<User> RegisterAsync(User user, string clearPassword)
        {
            var existingUser = await _userRepository.GetByEmailAsync(user.Email);
            if (existingUser != null)
            {
                throw new Exception("Acest email este deja utilizat!");
            }
            // 1. Hashing (Transformăm parola în cod sigur)
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(clearPassword);

            // 2. Setări inițiale (Bonus de bun venit)
            user.Balance = 1000;

            // 3. Salvare prin Repository
            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            return user;
        }
    }
}