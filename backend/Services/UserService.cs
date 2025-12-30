using backend.Models;
using backend.Repositories;
using BCrypt.Net;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<bool> ExistByEmail(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            return user != null;
        }

        public IUserRepository Get_userRepository()
        {
            return _userRepository;
        }

        public async Task<User> FindByEmail(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            return user ?? new User();
        }

        public async Task<User> RegisterAsync(User user, string clearPassword)
        {
            var existingUser = await _userRepository.GetByEmailAsync(user.Email);
            if (existingUser != null)
            {
                throw new Exception("Acest email este deja utilizat!");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(clearPassword);
            user.Balance = 1000;

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            return user;
        }

        // ANDREEA: MODIFICARE - Implementarea metodei care face legătura între Controller și Repository
        public async Task UpdateUserAsync(User user)
        {
            // ANDREEA: MODIFICARE - Pasul 1: Anunțăm Repository-ul de modificări
            await _userRepository.UpdateAsync(user);

            // ANDREEA: MODIFICARE - Pasul 2: Commit în baza de date PostgreSQL
            await _userRepository.SaveChangesAsync();
        }


    }
}