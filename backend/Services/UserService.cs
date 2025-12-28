using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> RegisterAsync(User user, string password)
        {
            user.PasswordHash = password;
            user.Balance = 1000;

            // În loc de UpdateDatabaseAsync, folosim Add și Save:
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync(); // Aceasta este metoda corectă

            return user;
        }
    }
}
