using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : ControllerBase
    {
        [HttpGet("status")]
        public IActionResult Get()
        {
            return Ok(new
            {
                message = "Pufi Pufos <3",
                serverTime = DateTime.Now,
                status = "Online"
            });
        }
    }
}
