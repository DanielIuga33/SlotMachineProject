using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<User?> GetByIdAsync(int id);
        Task<User> RegisterAsync(User user, string password);
        // Putem adăuga și: Task<bool> DeleteAsync(int id);
        Task<bool> ExistByEmail(string email);
        Task<User> FindByEmail(string email);

        // ANDREEA: MODIFICARE - Declarăm metoda în interfață pentru a fi vizibilă în Controller
        Task UpdateUserAsync(User user);
    }
}
