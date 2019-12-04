using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Kindergarten.Pages
{
    public class MissionModel : PageModel
    {
        private readonly ILogger<MissionModel> _logger;

        public MissionModel(ILogger<MissionModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}