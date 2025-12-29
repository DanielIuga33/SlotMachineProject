namespace backend.DTOs
{
    public class RegisterRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // Parola în clar de la user
        public string CNP { get; set; }
        public string Address { get; set; }
    }
}
