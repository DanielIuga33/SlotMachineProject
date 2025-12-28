using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<User?> GetByIdAsync(int id);
        Task<User> RegisterAsync(User user, string password);
        // Putem adăuga și: Task<bool> DeleteAsync(int id);
    }
}
